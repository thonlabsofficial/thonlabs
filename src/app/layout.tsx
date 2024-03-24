import type { Metadata } from 'next';
import '@/app/globals.scss';

export const metadata: Metadata = {
  title: {
    template: '%s | Thon Labs',
    default: 'Thon Labs',
  },
  icons: {
    icon: 'favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
