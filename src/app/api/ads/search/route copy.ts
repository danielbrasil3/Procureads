import { NextResponse } from 'next/server'

async function searchAds(accessToken: string, searchParams: URLSearchParams) {
  const response = await fetch(
    `https://graph.facebook.com/v21.0/ads_archive?${searchParams.toString()}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Erro na API do Facebook: ${JSON.stringify(errorData)}`)
  }

  return await response.json()
}

export async function POST(request: Request) {
  try {
    const { searchTerm, adType = 'FINANCIAL_PRODUCTS_AND_SERVICES_ADS' } = await request.json()
    
    console.log('Parâmetros de busca:', { searchTerm, adType })
  
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN
  
    if (!accessToken) {
      throw new Error('Token de acesso do Facebook não está configurado')
    }
    
    // First search
    const initialSearchParams = new URLSearchParams({
      access_token: accessToken,
      search_terms: searchTerm,
      ad_type: adType,
      ad_reached_countries: 'US,BR', // Add US as a fallback
      ad_active_status: 'ACTIVE',
      fields: 'id,page_id,page_name',
      limit: '1000',
      order_by: 'creation_time_desc'
    })
    
    let initialData
    try {
      initialData = await searchAds(accessToken, initialSearchParams)
    } catch (error) {
      // If the first attempt fails, try without specifying ad_type
      console.log('Primeira tentativa falhou, tentando sem ad_type')
      initialSearchParams.delete('ad_type')
      initialData = await searchAds(accessToken, initialSearchParams)
    }
    
    if (!initialData.data || !Array.isArray(initialData.data)) {
      throw new Error(`Formato de resposta inesperado: ${JSON.stringify(initialData)}`)
    }

    // Group ads by page and filter pages with more than 20 ads
    const pageGroups = initialData.data.reduce((groups: { [key: string]: any }, ad: any) => {
      if (!groups[ad.page_id]) {
        groups[ad.page_id] = { pageId: ad.page_id, pageName: ad.page_name, count: 0 }
      }
      groups[ad.page_id].count++
      return groups
    }, {})

    const relevantPages = Object.values(pageGroups).filter((page: any) => page.count > 20)

    // Second search for relevant pages
    const finalResults = await Promise.all(relevantPages.map(async (page: any) => {
      const pageSearchParams = new URLSearchParams({
        access_token: accessToken,
        search_page_ids: page.pageId,
        ad_reached_countries: 'US,BR', // Add US as a fallback
        ad_active_status: 'ACTIVE',
        fields: 'id,ad_creation_time,ad_delivery_start_time,ad_creative_bodies,ad_creative_link_titles,status,call_to_action_type,page_id,page_name,ad_creative_link_url,effective_object_story_id,creative{thumbnail_url,video_id,image_url},ad_snapshot_url',
        limit: '1000',
        order_by: 'creation_time_desc'
      })

      // Only add ad_type if it was successful in the first search
      if (initialSearchParams.has('ad_type')) {
        pageSearchParams.append('ad_type', adType)
      }

      const pageData = await searchAds(accessToken, pageSearchParams)

      return {
        pageId: page.pageId,
        pageName: page.pageName,
        totalAds: pageData.data.length,
        ads: pageData.data.map((ad: any) => ({
          id: ad.id,
          title: ad.ad_creative_link_titles?.[0] || 'Anúncio sem título',
          body: ad.ad_creative_bodies?.[0] || 'Sem descrição disponível',
          status: ad.status,
          callToActionType: ad.call_to_action_type,
          pageId: ad.page_id,
          pageName: ad.page_name,
          adLink: ad.ad_creative_link_url,
          creationTime: ad.ad_creation_time,
          deliveryStartTime: ad.ad_delivery_start_time,
          creativeType: ad.creative?.video_id ? 'video' : (ad.creative?.image_url ? 'image' : 'unknown'),
          creativeContent: ad.creative?.video_id 
            ? `https://www.facebook.com/ads/library/?id=${ad.creative.video_id}`
            : (ad.creative?.image_url || ad.creative?.thumbnail_url),
          adSnapshotUrl: ad.ad_snapshot_url,
        }))
      }
    }))

    return NextResponse.json({ data: finalResults, totalPages: finalResults.length })
  } catch (error) {
    console.error('Erro ao buscar anúncios:', error)
    return NextResponse.json({ error: 'Erro ao buscar anúncios' }, { status: 500 })
  }
}

