
import { stripe } from "../../utils/stripe_key";
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],

      payment_method_types: ['card'],
      mode: 'subscription',
      return_url: `${req.headers.get(
        'origin'
      )}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (err) {
    return NextResponse.json(err, {
      status: 400,
    });
  }
}