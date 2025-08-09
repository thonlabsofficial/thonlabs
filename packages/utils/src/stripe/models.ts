export type ProductPrice = {
  id: string;
  type: 'one_time' | 'recurring';
  nickname: string;
  lookupKey: string;
  currencyOptions?: Record<
    'usd' | 'brl',
    {
      unitAmount: number;
      currency: string;
    }
  >;
};
