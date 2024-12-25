"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from 'react'
import { ExternalLink, Calendar, Video, ImageIcon, ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Ad {
  id: string
  title: string
  body: string
  status: string
  callToActionType: string
  pageId: string
  pageName: string
  adLink?: string
  creationTime: string
  deliveryStartTime: string
  creativeType: 'video' | 'image' | 'unknown'
  creativeContent?: string | null
  adSnapshotUrl?: string
}

interface PageGroup {
  pageId: string
  pageName: string
  totalAds: number
  ads: Ad[]
}

interface AdResultsProps {
  pageGroups: PageGroup[]
  totalPages: number
  isVIP: boolean
}

export function AdResults({ pageGroups, totalPages, isVIP }: AdResultsProps) {
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set())

  const togglePage = (pageId: string) => {
    setExpandedPages(prev => {
      const next = new Set(prev)
      if (next.has(pageId)) {
        next.delete(pageId)
      } else {
        next.add(pageId)
      }
      return next
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const limitedPageGroups = isVIP ? pageGroups : pageGroups.slice(0, 3).map(group => ({
    ...group,
    ads: group.ads.slice(0, 5)
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="md:text-3xl text-xl font-bold">Resultados por Página</h2>
        <p className="md:text-lg text-sm text-muted-foreground">Total de Páginas: {totalPages}</p>
      </div>
      <div className="space-y-4">
        {limitedPageGroups.map((group) => (
          <Card key={group.pageId}>
            <CardHeader className="cursor-pointer" onClick={() => togglePage(group.pageId)}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm md:text-lg">{group.pageName}</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Total de Anúncios: {group.totalAds}</CardDescription>
                </div>
                {expandedPages.has(group.pageId) ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </div>
            </CardHeader>
            {expandedPages.has(group.pageId) && (
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.ads.map((ad) => (
                    <Card key={ad.id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">{ad.title}</CardTitle>
                        <CardDescription>ID: {ad.id}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground mb-4">{ad.body}</p>
                        
                        {ad.creativeContent && (
                          <div className="mb-4 relative">
                            {ad.creativeType === 'video' ? (
                              <Button variant="outline" size="sm" className="w-full" asChild>
                                <a href={ad.creativeContent} target="_blank" rel="noopener noreferrer">
                                  <Video className="w-4 h-4 mr-2" />
                                  Ver Vídeo
                                </a>
                              </Button>
                            ) : ad.creativeType === 'image' ? (
                              <Image
                                src={ad.creativeContent}
                                alt={ad.title}
                                width={300}
                                height={200}
                                className="w-full h-auto object-cover rounded-md"
                              />
                            ) : null}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="font-semibold">Formato</p>
                            <p>{ad.creativeType === 'video' ? 'Vídeo' : 
                                ad.creativeType === 'image' ? 'Imagem' : 'N/A'}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Tipo Criativo</p>
                            <p>{ad.callToActionType || 'N/A'}</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <p className="text-sm">Criação: {formatDate(ad.creationTime)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <p className="text-sm">Entrega: {formatDate(ad.deliveryStartTime)}</p>
                          </div>
                        </div>

                        {isVIP && (
                          <div className="mt-2 text-sm text-gray-600">
                            <p>Status: {ad.status}</p>
                            <p>Tipo de CTA: {ad.callToActionType}</p>
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          {ad.adLink && (
                            <Button variant="outline" size="sm" className="w-full" asChild>
                              <a href={ad.adLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Ver Anúncio
                              </a>
                            </Button>
                          )}
                          {ad.adSnapshotUrl && (
                            <Button variant="outline" size="sm" className="w-full" asChild>
                              <a href={ad.adSnapshotUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Ver Snapshot do Anúncio
                              </a>
                            </Button>
                          )}
                          <Button variant="default" size="sm" className="w-full" asChild>
                            <a href={`https://www.facebook.com/ads/library/?id=${ad.id}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Ver na Biblioteca de Anúncios
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
      {!isVIP && (
        <div className="mt-8 p-4 bg-blue-100 rounded-lg text-center">
          <p className="text-blue-800 mb-2">Veja mais anúncios e detalhes com a versão VIP!</p>
          <Link href="/upgrade">
            <Button variant="outline">Faça upgrade para VIP</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

