import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, TrendingUp, Zap } from 'lucide-react'
import { Subscription } from "@/lib/subscription";

export default async function DashboardPage() {
  const {session, subscription} = await Subscription();

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Bem-vindo, {session?.user?.name}</h1>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {subscription ? (
          <>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary/10">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <BarChart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Análise Avançada
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm sm:text-base text-muted-foreground mb-4">Acesse análises detalhadas e insights exclusivos.</p>
                <Link href="dashboard/vip" className="w-full">
                  <Button className="w-full text-sm sm:text-base">Acessar Área VIP</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-secondary/10">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Tendências de Mercado
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm sm:text-base text-muted-foreground mb-4">Explore as últimas tendências em anúncios.</p>
                <Link href="/trends" className="w-full">
                  <Button variant="outline" className="w-full text-sm sm:text-base">Ver Tendências</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-accent/10">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Comunidade VIP
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm sm:text-base text-muted-foreground mb-4">Conecte-se com outros profissionais de marketing.</p>
                <Link href="/community" className="w-full">
                  <Button variant="outline" className="w-full text-sm sm:text-base">Acessar Comunidade</Button>
                </Link>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-secondary/10">
                <CardTitle className="text-lg sm:text-xl">Versão Gratuita</CardTitle>
                <CardDescription className="text-sm sm:text-base">Você está usando a versão gratuita.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm sm:text-base mb-4 text-muted-foreground">Acesse recursos básicos de pesquisa de anúncios.</p>
                <Link href="dashboard/free" className="w-full">
                  <Button className="w-full text-sm sm:text-base">Área Gratuita</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow sm:col-span-2">
              <CardHeader className="bg-primary/10">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Upgrade para VIP
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">Desbloqueie recursos premium</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ul className="list-disc list-inside mb-4 text-muted-foreground grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                  <li>Análises avançadas</li>
                  <li>Insights exclusivos</li>
                  <li>Suporte prioritário</li>
                  <li>Acesso à comunidade VIP</li>
                </ul>
                <Link href="dashboard/upgrade" className="w-full">
                  <Button variant="default" size="lg" className="w-full text-sm sm:text-base">Fazer Upgrade para VIP</Button>
                </Link>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

