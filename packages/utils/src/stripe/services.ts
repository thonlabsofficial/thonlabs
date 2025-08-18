'use server';

import Stripe from 'stripe';
import { ProductPrice } from './models';

export async function getStripeClient() {
  return new Stripe(process.env.PAYMENT_PROVIDER_SK!, {
    apiVersion: '2025-07-30.basil',
  });
}

export async function getProductPrices(
  productRefId: string,
): Promise<ProductPrice[]> {
  const stripe = await getStripeClient();

  const prices = await stripe.prices.list({
    product: productRefId,
    active: true,
    expand: ['data.currency_options'],
  });

  return prices.data.map((price) => ({
    id: price.id,
    type: price.type || '',
    nickname: price.nickname || '',
    lookupKey: price.lookup_key || '',
    currencyOptions: {
      usd: {
        unitAmount: (price.currency_options?.['usd']?.unit_amount || 0) / 100,
        currency: 'usd',
      },
      brl: {
        unitAmount: (price.currency_options?.['brl']?.unit_amount || 0) / 100,
        currency: 'brl',
      },
    },
  }));
}

export async function getProductPrice(priceId: string): Promise<ProductPrice> {
  const stripe = await getStripeClient();
  const price = await stripe.prices.retrieve(priceId);

  return {
    id: price.id,
    type: price.type,
    nickname: price.nickname || '',
    lookupKey: price.lookup_key || '',
  };
}

export async function getStripeCustomer(tlUserId: string) {
  const stripe = await getStripeClient();
  const customers = await stripe.customers.search({
    query: `metadata['tlUserId']:'${tlUserId}'`,
  });

  return customers?.data?.[0];
}

export async function createStripeCustomer(user: {
  id: string;
  email: string;
  fullName: string;
}) {
  const stripe = await getStripeClient();
  return stripe.customers.create({
    email: user.email,
    name: user.fullName,
    metadata: { tlUserId: user.id },
  });
}
