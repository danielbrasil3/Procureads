import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { searchTerm, adType = 'FINANCIAL_PRODUCTS_AND_SERVICES_ADS' } = await request.json()
    
    console.log('Parâmetros de busca:', { searchTerm, adType })

    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN

    if (!accessToken) {
      throw new Error('Token de acesso do Facebook não está configurado')
    }
    
    const searchParams = new URLSearchParams({
      access_token: accessToken,
      search_terms: searchTerm,
      ad_type: adType,
      ad_reached_countries: 'BR',
      ad_active_status: 'ACTIVE',
      fields: 'id,ad_creation_time,ad_delivery_start_time,ad_creative_bodies,ad_creative_link_titles,status,call_to_action_type,page_id,page_name,ad_creative_link_url',
      limit: '1000',
      order_by: 'creation_time_desc'
    })
    
    const response = await fetch(
      `https://graph.facebook.com/v21.0/ads_archive?${searchParams.toString()}`
    )
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Erro na API do Facebook: ${JSON.stringify(errorData)}`)
    }
    
    const data = await response.json()
    
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error(`Formato de resposta inesperado: ${JSON.stringify(data)}`)
    }
    
    const transformedData = data.data.map((ad: any) => ({
      id: ad.id,
      title: ad.ad_creative_link_titles?.[0] || 'Anúncio sem título',
      body: ad.ad_creative_bodies?.[0] || 'Sem descrição disponível',
      status: ad.status,
      callToActionType: ad.call_to_action_type,
      pageId: ad.page_id,
      pageName: ad.page_name,
      adLink: ad.ad_creative_link_url,
      creationTime: ad.ad_creation_time,
      deliveryStartTime: ad.ad_delivery_start_time
    }))
    
    return NextResponse.json({ data: transformedData, total: data.data.length })
  } catch (error) {
    console.error('Erro ao buscar anúncios:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido' },
      { status: 500 }
    )
  }
}
