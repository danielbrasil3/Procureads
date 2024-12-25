import './globals.css'
import { AuthProvider, ThemeProvider } from '@/components/providers'

export const metadata = {
  title: 'Procure Ads',
  description: 'Descubra os anúncios mais escalados no Meta Ads',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className='font-whitney'>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

