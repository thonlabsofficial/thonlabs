import { DM_Sans as FontSans } from 'next/font/google';

const sans = FontSans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const fonts = {
  sans,
  className: `${sans.variable}`,
};
