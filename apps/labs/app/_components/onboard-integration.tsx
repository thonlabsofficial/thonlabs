'use client';

import { ButtonGroup, ButtonGroupItem } from '@repo/ui/button-group';
import { BentoGrid, BentoGridItem } from '@repo/ui/bento-grid';
import {
  BoxesIcon,
  CpuIcon,
  IdCardIcon,
  RouteIcon,
  LayoutPanelTopIcon,
  FlaskIcon,
  BlocksIcon,
} from '@repo/ui/animated-icons';
import { CodeBlock } from '@repo/ui/code-block';
import { useEnvironmentAppData } from '@/_hooks/use-environment-app-data';
import { Badge } from '@repo/ui/badge';
import { Typo } from '@repo/ui/typo';
import React from 'react';
import { BorderBeam } from '@repo/ui/border-beam';
import {
  OnboardIntegrationContext,
  OnboardIntegrationSdks,
} from '@/_providers/onboard-integration-provider';
import { cn } from '@repo/ui/core/utils';
import { useProjectIntegrationStatus } from '@/_hooks/use-project-integration-status';
import SectionHeader from '@/_components/section-header';

export function OnboardIntegrationHeader() {
  const { projectIntegrationStatus, isLoadingProjectIntegrationStatus } =
    useProjectIntegrationStatus();
  const { forceNotInitialized } = React.useContext(OnboardIntegrationContext);

  if (projectIntegrationStatus === 'notInitialized' || forceNotInitialized) {
    return (
      <SectionHeader
        title={
          <div className="flex items-center gap-0.5">
            <BlocksIcon className="-mt-1" />
            <div>Integrate in minutes, it's like lego</div>
          </div>
        }
        description="Select your library below, and follow simple quick steps to add authentication to your app."
      />
    );
  }

  if (isLoadingProjectIntegrationStatus) {
    return <SectionHeader title="loading" description="loading" loading />;
  }

  if (projectIntegrationStatus === 'partialCompleted') {
    return (
      <SectionHeader
        title="Update the environment variables"
        description="Your code integration is ready, but we need to connect it to this environment yet."
      />
    );
  }
}

export function OnboardIntegrationOptions() {
  const { projectIntegrationStatus } = useProjectIntegrationStatus();
  const { currentSdk, setCurrentSdk, forceNotInitialized } = React.useContext(
    OnboardIntegrationContext,
  );

  if (projectIntegrationStatus !== 'notInitialized' && !forceNotInitialized) {
    return null;
  }

  const sdks = [
    {
      label: 'Next.js@15',
      value: OnboardIntegrationSdks.NextJS15,
    },
    {
      label: 'Next.js@13+',
      value: OnboardIntegrationSdks.NextJS13Plus,
    },
    {
      label: 'React',
      value: OnboardIntegrationSdks.React,
      disabled: true,
    },
  ];

  return (
    <div>
      <ButtonGroup>
        {sdks.map((sdk) => (
          <ButtonGroupItem
            key={sdk.value}
            active={currentSdk === sdk.value}
            disabled={sdk.disabled}
            onClick={() => setCurrentSdk(sdk.value)}
            className={cn('flex items-center gap-1', {
              '!pr-0.5': sdk.disabled,
            })}
          >
            {sdk.label}
            {sdk.disabled && (
              <Badge size="xs" variant={'defaultNoOpacity'}>
                Soon
              </Badge>
            )}
          </ButtonGroupItem>
        ))}
      </ButtonGroup>
    </div>
  );
}

function getNextJSSteps({
  environmentId,
  publicKey,
  authDomain,
  sdkVersion,
}: {
  environmentId: string;
  publicKey: string;
  authDomain: string;
  sdkVersion: OnboardIntegrationSdks;
}) {
  return {
    'step-1': (
      <CodeBlock
        language="markdown"
        filename=".env"
        code={`NEXT_PUBLIC_TL_ENV_ID=${environmentId}
NEXT_PUBLIC_TL_PK=${publicKey}
NEXT_PUBLIC_TL_AUTH_DOMAIN=${authDomain}`}
      />
    ),
    'step-2': (
      <div className="space-y-2">
        <CodeBlock
          language="bash"
          filename=""
          showLineNumbers={false}
          tabs={[
            {
              name: 'npm',
              code: `$ npm install @thonlabs/nextjs`,
            },
            {
              name: 'yarn',
              code: `$ yarn add @thonlabs/nextjs`,
            },
            {
              name: 'pnpm',
              code: `$ pnpm add @thonlabs/nextjs`,
            },
          ]}
        />
      </div>
    ),
    'step-3': (
      <CodeBlock
        language="tsx"
        filename="app/layout.tsx"
        code={`import {ThonLabsWrapper} from "@thonlabs/nextjs${sdkVersion === OnboardIntegrationSdks.NextJS15 ? '' : '/v14'}";

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html>
      <body>
        <ThonLabsWrapper
          environmentId={process.env.NEXT_PUBLIC_TL_ENV_ID as string}
          publicKey={process.env.NEXT_PUBLIC_TL_PK as string}
          authDomain={process.env.NEXT_PUBLIC_TL_AUTH_DOMAIN as string}
        >
          {children}
        </ThonLabsWrapper>
      </body>
    </html>
  );
}`}
      />
    ),
    'step-4': (
      <div className="flex gap-2">
        <CodeBlock
          language="typescript"
          filename="app/api/auth/[...thonlabs]/route.ts"
          code={`export * from "@thonlabs/nextjs${sdkVersion === OnboardIntegrationSdks.NextJS15 ? '' : '/v14'}/api";`}
        />
        <CodeBlock
          language="typescript"
          filename="app/auth/[...thonlabs]/page.tsx"
          code={`import {ThonLabsAuthPage} from "@thonlabs/nextjs${sdkVersion === OnboardIntegrationSdks.NextJS15 ? '' : '/v14'}";
export default ThonLabsAuthPage;`}
        />
      </div>
    ),
    'step-5': (
      <CodeBlock
        language="typescript"
        filename="app/middleware.ts"
        code={`import { type NextRequest, NextResponse } from 'next/server';
import { validateSession, redirectToLogin, thonLabsConfig } from "@thonlabs/nextjs${sdkVersion === OnboardIntegrationSdks.NextJS15 ? '' : '/v14'}/server";

export async function middleware(req: NextRequest) {
  const redirect = await validateSession(req);
  if (redirect) {
    return redirectToLogin(redirect);
  }

  return NextResponse.next(thonLabsConfig(req));
}`}
      />
    ),
  };
}

export default function OnboardIntegration() {
  const { projectIntegrationStatus } = useProjectIntegrationStatus();
  const { environmentId, publicKey, authDomain } = useEnvironmentAppData();
  const { currentSdk, forceNotInitialized } = React.useContext(
    OnboardIntegrationContext,
  );
  const itemsChildren: Record<
    OnboardIntegrationSdks,
    Record<string, React.ReactNode>
  > = {
    [OnboardIntegrationSdks.NextJS15]: getNextJSSteps({
      environmentId,
      publicKey,
      authDomain,
      sdkVersion: OnboardIntegrationSdks.NextJS15,
    }),
    [OnboardIntegrationSdks.NextJS13Plus]: getNextJSSteps({
      environmentId,
      publicKey,
      authDomain,
      sdkVersion: OnboardIntegrationSdks.NextJS13Plus,
    }),
    [OnboardIntegrationSdks.React]: {},
  };

  const items = [
    ...(projectIntegrationStatus === 'notInitialized' || forceNotInitialized
      ? [
          {
            id: 'step-1',
            title: 'Step 1 - Environment keys',
            description:
              'Add your ThonLabs environment keys to your .env file.',
            icon: IdCardIcon,
            className: 'col-auto',
          },
          {
            id: 'step-2',
            title: 'Step 2 - Install the package',
            description:
              'Install the package using your favorite package manager.',
            icon: BoxesIcon,
            className: 'col-auto',
          },
          {
            id: 'step-3',
            title: 'Step 3 - Add the wrapper',
            description:
              'Add the ThonLabsWrapper to your root layout, placing it above other providers for optimal functionality.',
            icon: LayoutPanelTopIcon,
            className: 'col-span-2',
          },
          {
            id: 'step-4',
            title: 'Step 4 - Create API route and page files',
            description:
              'Create API route and page files to handle authentication flows and callbacks.',
            icon: RouteIcon,
            className: 'col-span-2',
          },
          {
            id: 'step-5',
            title: 'Step 5 - Implement middleware',
            description:
              'Implement middleware to protect routes and validate user sessions.',
            icon: CpuIcon,
            className: 'col-span-2',
          },
        ]
      : [
          {
            id: 'step-1',
            title: 'Environment keys',
            description: '',
            icon: IdCardIcon,
            className: 'col-span-2',
          },
        ]),
  ];

  /*
    This is just to animate the flask icon.
  */
  const [animate, setAnimate] = React.useState(false);

  function handleMouseEnter() {
    setAnimate(true);
  }

  function handleMouseLeave() {
    setAnimate(false);
  }

  return (
    <div>
      <BentoGrid className="grid-cols-2 gap-2">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            {...item}
            children={itemsChildren?.[currentSdk]?.[item.id]}
          />
        ))}
        {projectIntegrationStatus === 'notInitialized' ||
          (forceNotInitialized && (
            <BentoGridItem
              title=""
              description=""
              className="relative overflow-hidden col-span-2"
              afterSlot={
                <>
                  <BorderBeam
                    duration={6}
                    size={400}
                    className="from-transparent via-green-500 to-transparent"
                  />
                  <BorderBeam
                    duration={6}
                    size={400}
                    delay={9}
                    className="from-transparent via-blue-500 to-transparent"
                    reverse
                  />
                </>
              }
            >
              <div
                className="flex items-center justify-center gap-2 cursor-default"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <FlaskIcon size={24} animate={animate} />
                <Typo as="div" variant="h4" className="text-center">
                  Ready to go!
                </Typo>
                <Typo as="div" variant="lead" className="text-center">
                  Test your integration by signing up a new user in your app.
                </Typo>
              </div>
            </BentoGridItem>
          ))}
      </BentoGrid>
    </div>
  );
}
