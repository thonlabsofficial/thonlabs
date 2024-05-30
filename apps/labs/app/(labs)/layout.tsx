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
      {/* <header className="p-4 border-b border-solid">header</header> */}
      <main className="grid grid-cols-[12rem_1fr]">
        <aside className="h-screen bg-card border-r border-solid relative">
          <div className="p-4">
            <Logo className="h-4" />
          </div>

          <div className="border-b border-solid" />

          <nav className="flex flex-col gap-1 p-2">
            <div
              role="button"
              className="flex flex-col px-2 pb-1 pt-1.5 rounded-sm transition-all duration-100 ease-in-out hover:bg-gray-925/[0.06] dark:hover:bg-white/[0.03]"
            >
              <Typo
                variant={'xs'}
                className="text-muted-foreground font-semibold"
              >
                Project
              </Typo>
              <Typo variant={'small'}>Thon Labs</Typo>

              <nav className="h-screen bg-card border-r border-solid fixed left-[192px] top-0">
                <div className="py-2 px-4">
                  <Typo variant={'h3'} className="mb-4">
                    Projects
                  </Typo>

                  <div className="w-full grid grid-cols-2 gap-3">
                    <Card className="w-32 h-24 p-2">Test</Card>
                    <Card className="w-32 h-24 p-2">Test</Card>
                    <Card className="w-32 h-24 p-2">Test</Card>
                    <Card className="w-32 h-24 p-2">Test</Card>
                  </div>
                </div>
              </nav>
            </div>

            <div
              role="button"
              className="flex flex-col px-2 pb-1 pt-1.5 rounded-sm transition-all duration-100 ease-in-out hover:bg-gray-925/[0.06] dark:hover:bg-white/[0.03]"
            >
              <Typo
                variant={'xs'}
                className="text-muted-foreground font-semibold"
              >
                Environment
              </Typo>
              <Typo variant={'small'}>Production</Typo>
            </div>
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
