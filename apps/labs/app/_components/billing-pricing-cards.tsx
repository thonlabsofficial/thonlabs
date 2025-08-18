import { getAppData } from '@/_services/app-data-service';
import { PricingCards } from '@repo/ui/pricing-cards';
import { getProductPrices } from '@repo/utils/stripe/services';

interface BillingPricingCardsProps {
  environmentId?: string;
}

export default async function BillingPricingCards({
  environmentId,
}: BillingPricingCardsProps) {
  const { paymentProviderProductRefId } = await getAppData();
  const prices = await getProductPrices(paymentProviderProductRefId);

  return (
    <PricingCards
      environmentId={environmentId}
      location="dashboard"
      prices={prices}
    />
  );
}
