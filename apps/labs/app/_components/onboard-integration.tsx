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
  const { sdkIntegrated } = useEnvironmentAppData();

  if (sdkIntegrated) {
    return null;
  }

  return (
    <>
      {isLoadingProjectIntegrationStatus && (
        <SectionHeader title="loading" description="loading" loading />
      )}
      {projectIntegrationStatus === 'partialCompleted' && (
        <SectionHeader
          title="Update the environment variables"
          description="Your code integration is ready, but we need to connect it to this environment yet."
        />
      )}
      {projectIntegrationStatus === 'notInitialized' && (
        <SectionHeader
          title={
            <div className="flex items-center gap-0.5">
              <div>Integrate in Minutes - It's like lego</div>
              <BlocksIcon className="-mt-1" />
            </div>
          }
          description="Select your Next.js version below, and follow simple quick steps to add authentication to your application."
        />
      )}
    </>
  );
}

export function OnboardIntegrationOptions() {
  const { projectIntegrationStatus } = useProjectIntegrationStatus();
  const { currentSdk, setCurrentSdk } = React.useContext(
    OnboardIntegrationContext,
  );

  if (projectIntegrationStatus !== 'notInitialized') {
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

function getNextSteps({
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
NEXT_PUBLIC_TL_AUTH_API=${authDomain}`}
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
          environmentId="process.env.NEXT_PUBLIC_TL_ENV_ID"
          publicKey="process.env.NEXT_PUBLIC_TL_PK"
          baseURL="process.env.NEXT_PUBLIC_TL_AUTH_API"
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
      <div className="space-y-2">
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
        code={`import {validateSession, validationRedirect} from "@thonlabs/nextjs${sdkVersion === OnboardIntegrationSdks.NextJS15 ? '' : '/v14'}/server";

export async function middleware(req: NextRequest) {
  const redirect = await validateSession(req);
  if (redirect) {
    return validationRedirect(redirect);
  }

  return NextResponse.next();
}`}
      />
    ),
  };
}

export default function OnboardIntegration() {
  const { projectIntegrationStatus } = useProjectIntegrationStatus();
  const { environmentId, publicKey, authDomain } = useEnvironmentAppData();
  const { currentSdk } = React.useContext(OnboardIntegrationContext);
  const itemsChildren: Record<
    OnboardIntegrationSdks,
    Record<string, React.ReactNode>
  > = {
    [OnboardIntegrationSdks.NextJS15]: getNextSteps({
      environmentId,
      publicKey,
      authDomain,
      sdkVersion: OnboardIntegrationSdks.NextJS15,
    }),
    [OnboardIntegrationSdks.NextJS13Plus]: getNextSteps({
      environmentId,
      publicKey,
      authDomain,
      sdkVersion: OnboardIntegrationSdks.NextJS13Plus,
    }),
    [OnboardIntegrationSdks.React]: {},
  };

  const items = [
    ...(projectIntegrationStatus === 'notInitialized'
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
            className: 'col-auto',
          },
          {
            id: 'step-5',
            title: 'Step 5 - Implement middleware',
            description:
              'Implement middleware to protect routes and validate user sessions.',
            icon: CpuIcon,
            className: 'col-auto',
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
        {projectIntegrationStatus === 'notInitialized' && (
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
              <Typo as="div" variant="h3" className="text-center">
                All set! Go to your app, sign up and check the summary below
              </Typo>
              <FlaskIcon size={24} animate={animate} />
            </div>
          </BentoGridItem>
        )}
      </BentoGrid>
    </div>
  );
}
