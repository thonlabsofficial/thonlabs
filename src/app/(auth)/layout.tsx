import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>Auth</div>
      {children}
    </>
  );
}
