'use client';

import React from 'react';

export enum OnboardIntegrationSdks {
  NextJS15 = 'nextjs15',
  NextJS13Plus = 'nextjs13+',
  React = 'react',
}

export interface OnboardIntegrationContextProps {
  currentSdk: OnboardIntegrationSdks;
  setCurrentSdk: (sdk: OnboardIntegrationSdks) => void;
}

export const OnboardIntegrationContext =
  React.createContext<OnboardIntegrationContextProps>({
    currentSdk: OnboardIntegrationSdks.NextJS15,
    setCurrentSdk: () => {},
  });

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const OnboardIntegrationProvider = ({ children, ...props }: Props) => {
  const [currentSdk, setCurrentSdk] = React.useState<OnboardIntegrationSdks>(
    OnboardIntegrationSdks.NextJS15,
  );

  return (
    <OnboardIntegrationContext.Provider value={{ currentSdk, setCurrentSdk }}>
      {children}
    </OnboardIntegrationContext.Provider>
  );
};
