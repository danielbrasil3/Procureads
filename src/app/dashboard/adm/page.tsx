'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdResults } from "@/components/ad-results"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Nicho {
  id: string;
  name: string;
  description: string;
}


export default function AdminDashboard() {
  const [nichos, setNichos] = useState<Nicho[]>([])
  const [selectedNicho, setSelectedNicho] = useState<string>('')
  const [newNicho, setNewNicho] = useState('')
  const [nichoDescription, setNichoDescription] = useState('')

  useEffect(() => {
    // Simulating API call to fetch existing nichos
    setTimeout(() => {
      setNichos([
        { id: '1', name: 'Health & Fitness', description: 'Ads related to health and fitness products' },
        { id: '2', name: 'Finance', description: 'Ads related to financial products and services' },
      ])
    }, 1000)
  }, [])

  const handleCreateNicho = () => {
    if (newNicho && nichoDescription) {
      const newNichoObj = {
        id: Date.now().toString(),
        name: newNicho,
        description: nichoDescription
      }
      setNichos(prev => [...prev, newNichoObj])
      setNewNicho('')
      setNichoDescription('')
      // In a real application, you would also send this data to your backend
    }
  }

  const handleSendToVIP = (selectedAds: string[]) => {
    const selectedNichoObj = nichos.find(nicho => nicho.id === selectedNicho)
    if (selectedNichoObj) {
      // Simulating API call to send selected ads to VIP dashboard
      console.log('Sending to VIP:', { nicho: selectedNichoObj, ads: selectedAds })
      // In a real application, you would send this data to your backend
      alert('Ads sent to VIP dashboard successfully!')
    } else {
      alert('Please select a nicho before sending ads to VIP dashboard')
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Adicionar novo nicho</CardTitle>
          <CardDescription>Adicione um novo nicho para categorização de anúncios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Nome do Nicho"
              value={newNicho}
              onChange={(e) => setNewNicho(e.target.value)}
            />
            <Textarea
              placeholder="Descrição do Nicho"
              value={nichoDescription}
              onChange={(e) => setNichoDescription(e.target.value)}
            />
            <Button onClick={handleCreateNicho}>Criar nicho</Button>
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Selecione Ads</CardTitle>
          <CardDescription>Escolha os anúncios mais escalados para exibir no painel VIP</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedNicho} onValueChange={setSelectedNicho}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um nicho" />
              </SelectTrigger>
              <SelectContent>
                {nichos.map(nicho => (
                  <SelectItem key={nicho.id} value={nicho.id}>{nicho.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AdResults isAdmin={true} onSendToVIP={handleSendToVIP} />
        </CardContent>
      </Card>
    </div>
  )
}

