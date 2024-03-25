import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default function PortalRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>Portal</div>
      {children}
    </>
  );
}
