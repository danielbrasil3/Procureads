// pricingcard.tsx
import PaymentButton from './payment-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

export default function PricingCard({
  session,
  subscription,
}: {
  session: any;
  subscription: any;
}) {
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
        <ul className="space-y-2">
          <li className="flex gap-2 text-muted-foreground">
            Acesso a 1 ebook por mês
          </li>
          <li className="flex gap-2 text-muted-foreground">
            Curadoria especial
          </li>
          <li className="flex gap-2 text-muted-foreground">
            Acesso ilimitado
          </li>
          <li className="flex gap-2 text-muted-foreground">
            Cancele quando quiser
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        {!subscription && (
          <PaymentButton isLoggedIn={!!session} className="w-full">
            Assine Agora
          </PaymentButton>
        )}
      </CardFooter>
    </Card>
  );
}
