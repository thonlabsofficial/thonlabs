import { Metadata } from 'next';
import ThonlabsProvider from './_providers/thon-labs-provider';

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
};

export default function LabsNestedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThonlabsProvider>
      <div>Portal</div>
      {children}
    </ThonlabsProvider>
  );
}
