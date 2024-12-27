import Link from 'next/link';
import { Suspense, lazy } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart, Search, TrendingUp, MenuIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import PricingCard from '@/components/pricingcard';
import { Subscription } from '@/lib/subscription';

export default async function LandingPage() {
  const { session, subscription } = await Subscription();

  return (
    <main className="bg-background/10 text-foreground">
      <section className="container mx-auto text-center pb-20 px-4 md:px-0">
        <nav className="flex justify-between items-center py-6">
          <div className="flex gap-4">
            <Link href="/" className="flex items-center justify-center ml-5">
              <span className="font-bold text-2xl ">Procure Ads</span>
            </Link>
            <ThemeToggle />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="md:hidden">
              <MenuIcon size={24} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="#funcionamento">Funcionamento</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#preco">Preço</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/login">
                  <Button variant='outline' className="w-full">Login</Button>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="items-center gap-4 hidden md:flex">
            <Link href="#funcionamento">
              <Button variant="link">Funcionamento</Button>
            </Link>
            <Link href="#preco">
              <Button variant="link">Preço</Button>
            </Link>
            {subscription ? (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </nav>
        <section>
          <h1 className="md:text-6xl text-3xl font-bold md:font-bold mt-16 md:mt-24 leading-tight">
            Descubra os Anúncios Mais Escalados <br /> no Meta Ads
          </h1>
          <p className="text-muted-foreground mt-6 text-base md:text-xl max-w-3xl mx-auto">
            Otimize suas campanhas no Facebook e Instagram com insights poderosos dos anúncios de maior sucesso no mercado.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cadastro">
              <Button size="lg" className="w-full sm:w-auto">
                Comece Gratuitamente <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Já tenho uma conta
              </Button>
            </Link>
          </div>
          <p className="md:text-sm text-xs text-muted-foreground mt-4">
            Experimente a versão gratuita ou faça a assinatura. Cancele quando quiser.
          </p>
        </section>
      </section>
      <section id="funcionamento" className="bg-muted/40 py-20 text-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-12">
            Como o Procure Ads Funciona
          </h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Busca Inteligente</h3>
              <p className="text-muted-foreground max-w-sm text-sm">
                Encontre rapidamente os anúncios mais relevantes e bem-sucedidos no Meta Ads.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Análise Detalhada</h3>
              <p className="text-muted-foreground max-w-sm text-sm">
                Obtenha insights profundos sobre o desempenho e as características dos anúncios de sucesso.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Otimização de Campanhas</h3>
              <p className="text-muted-foreground max-w-sm text-sm">
                Use os dados para melhorar suas próprias campanhas e aumentar o ROI.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <Link href="/cadastro">
            <Button size="lg">
              Comece a Otimizar Seus Anúncios
            </Button>
          </Link>
        </div>
      </section>
      <section id="preco" className="py-20 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Plano Simples e Transparente
        </h2>
        <p className="text-muted-foreground text-base md:text-xl max-w-3xl mx-auto mb-12">
          Um único plano com tudo o que você precisa para impulsionar suas campanhas de anúncios.
        </p>
        <div className="flex justify-center">
          <Suspense fallback={<div>Loading...</div>}>
            <PricingCard session={session} subscription={subscription} />
          </Suspense>
        </div>
      </section>
      {!subscription && (
        <section className="bg-muted py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto Para Revolucionar Suas Campanhas?
          </h2>
          <p className="text-muted-foreground text-base md:text-xl max-w-3xl mx-auto mb-10">
            Junte-se a milhares de profissionais de marketing que já estão otimizando seus anúncios com o Procure Ads.
          </p>
          <Link href="/cadastro">
            <Button size="lg">
              Comece Agora
            </Button>
          </Link>
          <p className="md:text-sm text-xs text-muted-foreground mt-4">
            Comece sua assinatura agora mesmo. Cancele quando quiser.
          </p>
        </section>
      )}

      <footer className="py-12 text-center">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground mb-4">© 2024 Procure Ads. Todos os direitos reservados.</p>
          <nav className="flex justify-center gap-6">
            <Link href="/termos-de-servico" className="text-sm text-muted-foreground hover:text-primary">
              Termos de Serviço
            </Link>
            <Link href="/politica-de-privacidade" className="text-sm text-muted-foreground hover:text-primary">
              Política de Privacidade
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}