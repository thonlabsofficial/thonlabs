import { PricingCards } from '@repo/ui/pricing-cards';
import { getProductPrices } from '@repo/utils/stripe/services';

interface BillingPricingCardsProps {
  environmentId?: string;
}

export default async function BillingPricingCards({
  environmentId,
}: BillingPricingCardsProps) {
  const prices = await getProductPrices('tbd');

  return (
    <PricingCards
      environmentId={environmentId}
      location="dashboard"
      prices={prices}
    />
  );
}
