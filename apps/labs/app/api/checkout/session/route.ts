import { checkoutSessionValidator } from '@/_validators/checkout-validators';
import Log from '@repo/utils/log';
import {
  createStripeCustomer,
  getProductPrice,
  getStripeClient,
  getStripeCustomer,
} from '@repo/utils/stripe/services';
import { getSession } from '@thonlabs/nextjs/server';
import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    const { environmentId, priceId } = Object.fromEntries(
      request.nextUrl.searchParams,
    );

    const { success } = checkoutSessionValidator.safeParse({
      environmentId,
      priceId,
    });

    if (!success) {
      Log.error('POST /api/checkout/session', {
        error: 'Invalid request',
        data: { environmentId, priceId },
      });
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const [{ user }, headersList, stripe, price] = await Promise.all([
      getSession(),
      headers(),
      getStripeClient(),
      getProductPrice(priceId!),
    ]);
    const origin = headersList.get('origin');

    let stripeCustomer = await getStripeCustomer(user?.id!);

    if (!stripeCustomer) {
      const newCustomer = await createStripeCustomer(user!);
      stripeCustomer = newCustomer;
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: stripeCustomer.id,
      mode: price.type === 'one_time' ? 'payment' : 'subscription',
      ui_mode: 'hosted',
      success_url: `${origin}/${environmentId}/dashboard?checkout_status=success`,
      cancel_url: `${origin}/${environmentId}/dashboard?checkout_status=canceled`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
