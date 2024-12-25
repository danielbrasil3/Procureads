'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Procure Ads
          </Link>
          <nav className="flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
                <Link href="/api/auth/signout">
                  <Button variant="outline">Sair</Button>
                </Link>
              </>
            ) : (
              <Link href="/api/auth/signin">
                <Button>Entrar</Button>
              </Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="border-t">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          © 2024 Procure Ads. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}

