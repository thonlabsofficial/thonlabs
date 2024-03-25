import { League_Spartan as FontSans } from 'next/font/google';

const sans = FontSans({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  variable: '--font-sans',
});

export const fonts = {
  sans,
  className: `${sans.variable}`,
};
