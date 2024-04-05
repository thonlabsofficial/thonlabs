import { Metadata } from 'next';
import ThonLabsProvider from './_providers/thon-labs-provider';
import { Typo } from '@/ui/components/ui/typo';
import dynamic from 'next/dynamic';

const Logo = dynamic(() => import('@/ui/components/app/logo'), { ssr: false });

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
    <ThonLabsProvider>
      {/* <header className="p-4 border-b border-solid">header</header> */}
      <main className="grid grid-cols-[12rem_1fr]">
        <aside className="h-screen bg-card border-r border-solid">
          <div className="flex justify-center p-4">
            <Logo className="h-4" />
          </div>

          <div className="border-b border-solid" />

          <nav className="p-4">
            <Typo>Projeto / Environment</Typo>
          </nav>

          <div className="border-b border-solid" />

          <nav className="p-4">
            <Typo>Menus</Typo>
          </nav>
        </aside>
        <div>{children}</div>
      </main>
    </ThonLabsProvider>
  );
}
