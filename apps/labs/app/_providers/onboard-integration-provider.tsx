'use client';

import { useEnvironmentAppData } from '@/_hooks/use-environment-app-data';
import React from 'react';

export enum OnboardIntegrationSdks {
  NextJS15 = 'nextjs15',
  NextJS13Plus = 'nextjs13+',
  React = 'react',
}

export interface OnboardIntegrationContextProps {
  currentSdk: OnboardIntegrationSdks;
  setCurrentSdk: (sdk: OnboardIntegrationSdks) => void;
  forceNotInitialized?: boolean;
}

export const OnboardIntegrationContext =
  React.createContext<OnboardIntegrationContextProps>({
    currentSdk: OnboardIntegrationSdks.NextJS15,
    setCurrentSdk: () => {},
    forceNotInitialized: false,
  });

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  forceNotInitialized?: boolean;
}

export const OnboardIntegrationProvider = ({
  children,
  forceNotInitialized = false,
}: Props) => {
  const { sdkIntegrated } = useEnvironmentAppData();
  const [currentSdk, setCurrentSdk] = React.useState<OnboardIntegrationSdks>(
    OnboardIntegrationSdks.NextJS15,
  );

  return (
    (!sdkIntegrated || forceNotInitialized) && (
      <OnboardIntegrationContext.Provider
        value={{ currentSdk, setCurrentSdk, forceNotInitialized }}
      >
        {children}
      </OnboardIntegrationContext.Provider>
    )
  );
};
