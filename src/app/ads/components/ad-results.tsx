"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from 'react'
import { ExternalLink, Calendar } from 'lucide-react'

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
}

interface AdResultsProps {
  ads: Ad[]
  totalAds: number
}

export function AdResults({ ads, totalAds }: AdResultsProps) {
  const [adCounts, setAdCounts] = useState<{[key: string]: number}>({})

  useEffect(() => {
    const counts: {[key: string]: number} = {}
    ads.forEach(ad => {
      counts[ad.pageId] = (counts[ad.pageId] || 0) + 1
    })
    setAdCounts(counts)
  }, [ads])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Resultados dos Anúncios
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            Total de Anúncios Pesquisados: {totalAds}
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ads.map((ad) => (
          <Card key={ad.id} className="group relative overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/10 ">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <CardTitle className="text-xl font-bold leading-tight">{ad.title}</CardTitle>
                  <CardDescription className="font-medium text-xs">
                    ID: {ad.id}
                  </CardDescription>
                </div>
                <Badge 
                  variant="secondary"
                  className="bg-green-500"
                >
                  Ativo
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{ad.body}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Página</p>
                  <p className="font-semibold">{ad.pageName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total de Anúncios</p>
                  <p className="font-semibold">{adCounts[ad.pageId] || 1}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div>
                      <p className="font-medium">Criação</p>
                      <p>{formatDate(ad.creationTime)}</p>
                    </div>
                    <div>
                      <p className="font-medium">Entrega em</p>
                      <p>{formatDate(ad.deliveryStartTime)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  {ad.adLink && (
                    <Button variant="outline" size="sm" className="w-full group/button" asChild>
                      <a 
                        href={ad.adLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover/button:translate-x-0.5" />
                        Ver Anúncio
                      </a>
                    </Button>
                  )}
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary group/button" 
                    asChild
                  >
                    <a 
                      href={`https://www.facebook.com/ads/library/?id=${ad.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover/button:translate-x-0.5" />
                      Ver na Biblioteca de Anúncios
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

