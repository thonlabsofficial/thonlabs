'use server';

import Stripe from 'stripe';
import { ProductPrice } from './models';

const stripe = new Stripe(process.env.PAYMENT_PROVIDER_SK!, {
  apiVersion: '2025-07-30.basil',
});

export async function getProductPrices(
  productRefId: string,
): Promise<ProductPrice[]> {
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
  const price = await stripe.prices.retrieve(priceId);

  return {
    id: price.id,
    type: price.type,
    nickname: price.nickname || '',
    lookupKey: price.lookup_key || '',
  };
}
