'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink } from 'lucide-react'

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

interface AdResultsProps {
  isAdmin?: boolean
  onSendToVIP?: (selectedAds: string[]) => void
}

const sampleAds: Ad[] = [
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
  {
    id: "2",
    activeAds: 250,
    location: "Latam",
    type: "Video Aula",
    hasExpert: true,
    landingPageType: "VSL",
    link: "www.example.com",
    creativesLink: "www.adlibrary.com"
  },
  {
    id: "3",
    activeAds: 147,
    location: "Brasil",
    type: "Ebook",
    hasExpert: false,
    landingPageType: "Quiz",
    link: "www.udhdhsh.com",
    creativesLink: "www.bibliotecadeanuncios.com"
  },
  {
    id: "4",
    activeAds: 250,
    location: "Latam",
    type: "Video Aula",
    hasExpert: true,
    landingPageType: "VSL",
    link: "www.example.com",
    creativesLink: "www.adlibrary.com"
  },
  {
    id: "5",
    activeAds: 147,
    location: "Brasil",
    type: "Ebook",
    hasExpert: false,
    landingPageType: "Quiz",
    link: "www.udhdhsh.com",
    creativesLink: "www.bibliotecadeanuncios.com"
  },
  {
    id: "6",
    activeAds: 250,
    location: "Latam",
    type: "Video Aula",
    hasExpert: true,
    landingPageType: "VSL",
    link: "www.example.com",
    creativesLink: "www.adlibrary.com"
  },
  // Add more sample ads as needed
]

export function AdResults({ isAdmin = false, onSendToVIP }: AdResultsProps) {
  const [selectedAds, setSelectedAds] = useState<string[]>([])

  const handleAdSelection = (adId: string) => {
    setSelectedAds(prev => 
      prev.includes(adId) ? prev.filter(id => id !== adId) : [...prev, adId]
    )
  }

  const handleSendToVIP = () => {
    if (onSendToVIP) {
      onSendToVIP(selectedAds)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sampleAds.map((ad) => (
          <Card key={ad.id} className={ad.activeAds > 50 ? "bg-gradient-to-t from-green-600/50" : ""}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Anúncios ativos:</h2>
                    <span className="text-2xl font-semibold">{ad.activeAds}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Titulo:</span>
                      <span>{ad.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Descrição:</span>
                      <span>{ad.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Local:</span>
                      <span>{ad.hasExpert ? "Sim" : "Não"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Landing Page:</span>
                      <span>{ad.landingPageType}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                      <a href={ad.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Link Landing Page
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={ad.creativesLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Criativos
                      </a>
                    </Button>
                  </div>
                </div>
                {isAdmin && (
                  <div className="ml-4">
                    <Checkbox
                      checked={selectedAds.includes(ad.id)}
                      onCheckedChange={() => handleAdSelection(ad.id)}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {isAdmin && (
        <Button onClick={handleSendToVIP} disabled={selectedAds.length === 0}>
          Send Selected Ads to VIP Dashboard
        </Button>
      )}
    </div>
  )
}

