import { checkoutSessionValidator } from '@/_validators/checkout-validators';
import Log from '@repo/utils/log';
import { getProductPrice, getStripeClient } from '@repo/utils/stripe/services';
import { getSession } from '@thonlabs/nextjs/server';
import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

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

    const { user } = await getSession();
    const headersList = await headers();
    const origin = headersList.get('origin');
    const stripe = await getStripeClient();

    const price = await getProductPrice(priceId!);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user?.email,
      mode: price.type === 'one_time' ? 'payment' : 'subscription',
      ui_mode: 'hosted',
      success_url: `${origin}/${environmentId}/dashboard?session_id={CHECKOUT_SESSION_ID}&checkout_status=success`,
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
