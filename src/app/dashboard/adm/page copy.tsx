import { SearchAds } from "@/components/search-ads"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VipPage() {
  return (
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Pesquisa de Anúncios VIP</h1>
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-2xl">Versão VIP</CardTitle>
            <CardDescription>
              Acesso completo a todos os anúncios escalados e funcionalidades avançadas
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <SearchAds isVip={true} />
          </CardContent>
        </Card>
      </div>
  )
}
