import BannerWarning from '@/components/banner-warning';
import PricingCard from '@/components/pricingcard';
import { Subscription } from '@/lib/subscription';

export default async function MySubscription() {
  const { session, subscription } = await Subscription();
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Minha Assinatura</h1>
      <BannerWarning text="Você precisa de uma assinatura ativa. Quer tal assinar agora?" />
      <PricingCard session={session} subscription={subscription} />
    </>
  );
}