import { Metadata } from 'next';
import ThonLabsProvider from './_providers/thon-labs-provider';
import { Typo } from '@repo/ui/typo';
import dynamic from 'next/dynamic';
import { Card } from '@repo/ui/card';

const Logo = dynamic(() => import('@/_components/logo'), { ssr: false });

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
      <header className="p-4 border-b border-solid">
        <nav className="flex gap-1">
          <div className="flex gap-1">
            <Logo reduced className="h-7" />
          </div>

          {/* <div
              role="button"
              className="flex flex-col gap-0.5 px-2 pb-1 pt-1.5 rounded-sm transition-all duration-100 ease-in-out hover:bg-gray-925/[0.06] dark:hover:bg-white/[0.03]"
            >
              <Typo
                variant={'xs'}
                className="text-muted-foreground font-semibold"
              >
                Project / Environment
              </Typo>
              <Typo variant={'small'}>Thon Labs / Production</Typo>
            </div> */}
        </nav>
      </header>
      <main className="grid grid-cols-[16rem_1fr]">
        <aside className="h-screen relative">
          <nav className="p-4">
            <Typo>Menus</Typo>
          </nav>
        </aside>
        <div>{children}</div>
      </main>
    </ThonLabsProvider>
  );
}
