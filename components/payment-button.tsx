

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import { useCallback } from 'react';

type PaymentButtonProps = {
  children: React.ReactNode;
  className?: string;
  isLoggedIn: boolean;
};

export default function PaymentButton({
  children,
  className,
  isLoggedIn = false,
}: PaymentButtonProps) {
  
  const stripePromise = loadStripe(
    'pk_test_51QXo8oA5TjvYIZXvLjGpmuqxy1VPN3HPdI1Q1HlzU9TPdN0NCI5O5GbOtYvlGKWJlqKuW87rNIjJ1Gt4D6MVQxl200qdVMcPWq'
  );

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    return fetch('/api/checkout/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button
          type="submit"
          formMethod="post"
          variant={'default'}
          className={className}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-full overflow-auto ">
        {!isLoggedIn && <LoggedOutContent />}
        {isLoggedIn && (
          <>
            <VisuallyHidden.Root>
              <DialogTitle className="text-xl font-semibold">
                Pro Membership
              </DialogTitle>
            </VisuallyHidden.Root>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout className='max-h-[80dvh]' />
            </EmbeddedCheckoutProvider>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function LoggedOutContent() {
  return (
    <>
      <DialogTitle className="flex items-center gap-2">Ops...</DialogTitle>
      <h2>Você precisa possuir uma conta para assinar!</h2>
      <Link href="/cadastro" className={buttonVariants({ variant: 'default' })}>
        Criar Conta
      </Link>

      <p className="text-muted-foreground text-sm mt-2">
        Já possui conta?
        <Link
          className={cn(
            buttonVariants({ variant: 'link' }),
            'text-muted-foreground pl-2'
          )}
          href="/login"
        >
          Faça seu login
        </Link>
      </p>
    </>
  );
}