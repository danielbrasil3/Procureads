'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface Ad {
  id: string
  activeAds: number
  location: "Brasil" | "Latam" | "Internacional"
  type: "Ebook" | "Video Aula" | "Nutra" | "Drop"
  hasExpert: boolean
  landingPageType: "Quiz" | "VSL" | "TSL" | "Checkout Personalizado"
  link: string
  creativesLink: string
}

interface Nicho {
  id: string;
  name: string;
  description: string;
  ads: Ad[];
}

export default function VipPage() {
  const [nichos, setNichos] = useState<Nicho[]>([])
  const [selectedNicho, setSelectedNicho] = useState<string>('')

  useEffect(() => {
    // Simulating API call to fetch nichos and their selected ads
    setTimeout(() => {
      setNichos([
        {
          id: '1',
          name: 'Health & Fitness',
          description: 'Ads related to health and fitness products',
          ads: [
            {
              id: "1",
              activeAds: 147,
              location: "Brasil",
              type: "Ebook",
              hasExpert: false,
              landingPageType: "Quiz",
              link: "www.udhdhsh.com",
              creativesLink: "www.bibliotecadeanuncios.com"
            },
            // Add more ads as needed
          ]
        },
        // Add more nichos as needed
      ])
    }, 1000)
  }, [])

  const selectedNichoData = nichos.find(nicho => nicho.id === selectedNicho)
  return (
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Anúncios VIP</h1>
          <Select value={selectedNicho} onValueChange={setSelectedNicho}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o nicho" />
            </SelectTrigger>
            <SelectContent>
              {nichos.map(nicho => (
                <SelectItem key={nicho.id} value={nicho.id}>{nicho.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="pt">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        

        {selectedNichoData && (
          <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{selectedNichoData.name}</CardTitle>
              <CardDescription>{selectedNichoData.description}</CardDescription>
            </CardHeader>
          </Card>
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {selectedNichoData.ads.map((ad) => (
                <CarouselItem key={ad.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className={ad.activeAds > 50 ? "bg-gradient-to-t from-green-600/50" : ""}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-2xl font-bold">Anúncios ativos:</h2>
                          <span className="text-2xl font-semibold">{ad.activeAds}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Pagina:</span>
                            <span>{ad.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Local:</span>
                            <span>{ad.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Tipo:</span>
                            <span>{ad.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Tem Expert:</span>
                            <span>{ad.hasExpert ? "Sim" : "Não"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Landing Page:</span>
                            <span>{ad.landingPageType}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button variant="default" className="w-full" asChild>
                            <a href={ad.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Link Landing Page
                            </a>
                          </Button>
                          <Button variant="default" className="w-full" asChild>
                            <a href={ad.creativesLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Criativos
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}
    </div>
  )
}

