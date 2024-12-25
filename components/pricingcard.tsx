'use client'

import { memo, useMemo, useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import PaymentButton from './payment-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Subscription } from '@/lib/subscription'
import { auth } from '@/auth'

const PlanItems = memo(() => (
  <ul className="space-y-2">
    <li className="flex gap-2 text-muted-foreground">
      <Check className="w-4 text-green-600 shrink-0" />
      Acesso a 1 ebook por mês
    </li>
    <li className="flex gap-2 text-muted-foreground">
      <Check className="w-4 text-green-600 shrink-0" />
      Curadoria especial
    </li>
    <li className="flex gap-2 text-muted-foreground">
      <Check className="w-4 text-green-600 shrink-0" />
      Acesso ilimitado
    </li>
    <li className="flex gap-2 text-muted-foreground">
      <Check className="w-4 text-green-600 shrink-0" />
      Cancele quando quiser
    </li>
  </ul>
))
PlanItems.displayName = 'PlanItems'

export default function PricingCard() {
  const [subscription, setSubscription] = useState<any>(null)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const subscriptionData = await Subscription()
      const sessionData = await auth()

      setSubscription(subscriptionData)
      setSession(sessionData)
    }

    fetchData()
  }, [])

  // Use useMemo to avoid unnecessary recomputation of the renderButton
  const renderButton = useMemo(() => {
    if (subscription) return null
    
    return (
      <PaymentButton isLoggedIn={!!session} className="w-full">
        Assine Agora
      </PaymentButton>
    )
  }, [session, subscription])

  return (
    <Card className="text-left md:mt-6 mt-4">
      <CardHeader>
        <CardTitle>Plano Pro Premium VIP</CardTitle>
        <CardDescription>
          Tudo que você precisa para seus estudos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold mb-8 mt-4">
          R$39,00
          <span className="font-normal text-muted-foreground text-lg">
            /mês
          </span>
        </p>
        <PlanItems />
      </CardContent>
      <CardFooter>
        {renderButton}
      </CardFooter>
    </Card>
  )
}
