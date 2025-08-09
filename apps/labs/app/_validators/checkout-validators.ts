import { z } from 'zod';

export const checkoutSessionValidator = z.object({
  environmentId: z.string(),
  priceId: z.string(),
});

export type CheckoutSessionValidator = z.infer<typeof checkoutSessionValidator>;
