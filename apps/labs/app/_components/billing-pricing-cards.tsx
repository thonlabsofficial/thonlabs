import { PricingCards } from '@repo/ui/pricing-cards';
import { getProductPrices } from '@repo/utils/stripe/services';

interface BillingPricingCardsProps {
  environmentId?: string;
}

export default async function BillingPricingCards({
  environmentId,
}: BillingPricingCardsProps) {
  const prices = await getProductPrices('prod_So4X4zdg4uTy1l');
  // TODO: @gus -> get waitlist users to give them the discount
  const userPromotionCategory = 'standard';

  return (
    <PricingCards
      environmentId={environmentId}
      location="landing"
      userPromotionCategory={userPromotionCategory}
      prices={prices}
    />
  );
}
