import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, BarChart2, TrendingUp, DollarSign } from 'lucide-react'
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Facebook className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">Procure Ads</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#recursos">
            Recursos
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#precos">
            Preços
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#contato">
            Contato
          </Link>
          <ThemeToggle />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Descubra os Anúncios do Facebook Mais Populares
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Obtenha insights dos anúncios de melhor desempenho no Facebook e impulsione sua estratégia de marketing.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/ads"}><Button>Começar Agora</Button></Link>
                <Button variant="outline">Saiba Mais</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="recursos" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Principais Recursos</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <BarChart2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Análise de Desempenho de Anúncios</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Obtenha insights detalhados sobre os anúncios de melhor desempenho em várias indústrias e demografias.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Identificação de Tendências</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mantenha-se à frente identificando tendências emergentes em campanhas de anúncios bem-sucedidas no Facebook.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <DollarSign className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Otimização de ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Maximize seu investimento em anúncios aprendendo com as campanhas mais eficazes do seu setor.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Pronto para Otimizar seus Anúncios no Facebook?
                </h2>
                <p className="mx-auto max-w-[600px] md:text-xl opacity-90">
                  Junte-se a milhares de profissionais de marketing que já estão aproveitando nossos insights para criar campanhas vencedoras.
                </p>
              </div>
              <Button className="bg-background text-foreground hover:bg-secondary">Inicie seu Teste Gratuito</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 AnalisadorDeAnúncios. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-primary transition-colors" href="#">
            Termos de Serviço
          </Link>
          <Link href="/politica-de-privacidade" className="text-xs hover:text-primary transition-colors">
            Política de Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  )
}

