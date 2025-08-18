import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge, BadgeProps } from './badge';
import { Button, ButtonProps, buttonVariants } from './button';
import { Card, CardContent, CardHeader } from './card';
import { Typo } from './typo';
import { ProductPrice } from '@repo/utils/stripe/models';

type PricingCard = {
  order: number;
  refId: string;
  title: string;
  badgeLabel: string;
  badgeVariant: BadgeProps['variant'];
  priceAmount: string;
  priceType: string;
  description: string;
  ctaLabelLanding: string;
  ctaLabelDashboard: string;
  ctaVariant: ButtonProps['variant'];
  featuresLabel: string;
  featuresItems: string[];
  priceId?: string;
  cardTransparent?: boolean;
};

const defaultPricingCards: PricingCard[] = [
  {
    order: 1,
    cardTransparent: true,
    refId: 'basic',
    title: 'Basic',
    badgeLabel: 'No Credit Card Required',
    badgeVariant: 'outline',
    priceAmount: '$0',
    priceType: 'month',
    description:
      'Perfect for exploring ThonLabs and start building your project.',
    ctaLabelLanding: 'Start for Free',
    ctaLabelDashboard: 'Continue on Basic',
    ctaVariant: 'outline',
    featuresLabel: 'Get started with',
    featuresItems: [
      'Auth builder integration',
      'Organization sign ups',
      'Notion-style email templates',
      'Easy Next.js integration',
      'Custom session duration',
      '8,000 MAUs included',
      '1 project',
      'Up to 2 environments',
      'Up to 3 organizations',
      'Community support',
    ],
  },
  {
    order: 2,
    refId: 'pro::monthly',
    title: 'Pro',
    badgeLabel: 'Popular',
    badgeVariant: 'default',
    priceAmount: '$20',
    priceType: 'month',
    description:
      'Unlock the full potential of ThonLabs with more resources and features.',
    ctaLabelLanding: 'Sign up with Pro',
    ctaLabelDashboard: 'Upgrade to Pro',
    ctaVariant: 'primary',
    featuresLabel: 'Grow up with',
    featuresItems: [
      'All features from Basic',
      '80,000 MAUs included ($0.04/user after)',
      'Up to 10 projects',
      'Up to 50 environments',
      'Up to 100 organizations',
      'Email support',
    ],
  },
  {
    order: 3,
    cardTransparent: true,
    refId: 'pro::lifetime',
    title: 'Lifetime',
    badgeLabel: 'Limited offer',
    badgeVariant: 'success',
    priceAmount: '$249',
    priceType: 'once',
    description:
      'A single payment for lifetime access—no monthly fees. Limited time offer on beta.',
    ctaLabelLanding: 'Get lifetime access',
    ctaLabelDashboard: 'Upgrade to Lifetime',
    ctaVariant: 'outline',
    featuresLabel: 'Grow up forever with',
    featuresItems: [
      'All features from Pro',
      'Exclusive lifetime updates',
      'One-time payment, no recurring fees (except for MAUs)',
    ],
  },
];

interface PricingCardsProps {
  environmentId?: string;
  location: 'landing' | 'dashboard';
  prices: ProductPrice[];
}

export function PricingCards({
  environmentId,
  location,
  prices,
}: PricingCardsProps) {
  const pricingCards = prices
    .filter((price) => {
      const [type] = price.lookupKey.split('::');

      return type === 'pro';
    })
    .map((price) => {
      const [type, interval] = price.lookupKey.split('::');

      const refId = `${type}::${interval}`;

      return {
        ...defaultPricingCards.find((card) => card.refId === refId)!,
        title: price.nickname,
        priceAmount: `$${price.currencyOptions?.usd?.unitAmount || 0}`,
        priceId: price.id,
      };
    });

  return (
    <section className="grid grid-cols-3 gap-4">
      {([defaultPricingCards[0], ...pricingCards] as PricingCard[])
        .sort((a, b) => a.order - b.order)
        .map((card) => (
          <Card
            key={`pricing-card-${card.refId}`}
            padding
            variant={card.cardTransparent ? 'transparent' : 'default'}
          >
            <CardHeader>
              <div className="flex items-center gap-2 justify-between mb-3">
                <Typo variant="lead">{card.title}</Typo>
                <Badge
                  variant={card.badgeVariant as BadgeProps['variant']}
                  size="sm"
                >
                  {card.badgeLabel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <Typo variant="h2">{card.priceAmount}</Typo>
                <div>
                  <Typo as="div" variant="muted" className="-mt-6">
                    /{card.priceType}
                  </Typo>
                </div>
              </div>

              <Typo as="div" variant="muted" className="mt-2">
                {card.description}
              </Typo>

              <div className="my-6">
                {card.refId === 'basic' ? (
                  <>
                    {location === 'dashboard' && (
                      <Link
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/${environmentId}/dashboard`}
                        className={buttonVariants({
                          variant: card.ctaVariant as ButtonProps['variant'],
                          className: 'w-full',
                        })}
                      >
                        {card.ctaLabelDashboard}
                      </Link>
                    )}
                    {location === 'landing' && (
                      <a
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-up`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          variant: card.ctaVariant as ButtonProps['variant'],
                          className: 'w-full',
                        })}
                      >
                        {card.ctaLabelLanding}
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    {location === 'dashboard' && (
                      <form
                        action={`${process.env.NEXT_PUBLIC_APP_URL}/api/checkout/session?environmentId=${environmentId}&priceId=${card.priceId}`}
                        method="POST"
                      >
                        <Button
                          variant={card.ctaVariant as ButtonProps['variant']}
                          className="w-full"
                        >
                          {card.ctaLabelDashboard}
                        </Button>
                      </form>
                    )}
                    {location === 'landing' && (
                      <a
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-up?priceId=${card.priceId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant={card.ctaVariant as ButtonProps['variant']}
                          className="w-full"
                        >
                          {card.ctaLabelLanding}
                        </Button>
                      </a>
                    )}
                  </>
                )}
              </div>

              <div>
                <div className="flex justify-around items-center gap-2 mb-4">
                  <div className="flex flex-1 h-px bg-border" />
                  <Typo
                    as="div"
                    variant="sm"
                    className="shrink-1 flex items-center justify-center px-2"
                  >
                    {card.featuresLabel}
                  </Typo>
                  <div className="flex flex-1 h-px bg-border" />
                </div>

                <ul className="space-y-2">
                  {card.featuresItems?.map((item: string) => (
                    <li className="flex gap-2" key={item}>
                      <CheckCircle className="basis-2.5 h-2.5 flex-none mt-1.5" />
                      <Typo as="div" variant="muted" className="text-sm">
                        {item}
                      </Typo>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
    </section>
  );
}
