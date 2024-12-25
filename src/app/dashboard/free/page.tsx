import { SearchAds } from "@/components/search-ads"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from 'lucide-react'

export default function FreePage() {
  return (
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Pesquisa de Anúncios Gratuita</h1>
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-secondary/10">
            <CardTitle className="text-2xl">Versão Gratuita</CardTitle>
            <CardDescription>
              Pesquise e analise anúncios da Biblioteca de Anúncios do Facebook (funcionalidades limitadas)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <SearchAds />
          </CardContent>
        </Card>
        <div className="text-center mt-8">
          <Link href="/dashboard/upgrade">
            <Button size="lg" className="animate-pulse">
              Faça upgrade para a versão VIP
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
  )
}
