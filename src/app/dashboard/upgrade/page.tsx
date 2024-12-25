'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PaymentButton from '@/components/payment-button'

export default function UpgradePage() {

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Faça upgrade para VIP</CardTitle>
          <CardDescription>Acesse todas as funcionalidades premium</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-6">
            <li>Acesso completo a todos os anúncios escalados</li>
            <li>Filtros avançados e análises detalhadas</li>
            <li>Exportação de dados</li>
            <li>Suporte prioritário</li>
          </ul>
          <PaymentButton isLoggedIn={true}>Assine Agora</PaymentButton>
        </CardContent>
      </Card>
    </div>
  )
}

