'use client';

import React from 'react';
import { EnvironmentData } from '../../shared/interfaces/environment-data';
import { SWRConfig } from 'swr';

export interface ThonLabsInternalContextProps {
  previewMode?: boolean;
  setPreviewMode: (previewMode: boolean) => void;
  previewEnvironmentData?: EnvironmentData;
  setPreviewEnvironmentData: (previewEnvironmentData: EnvironmentData) => void;
}

export const ThonLabsInternalContext =
  React.createContext<ThonLabsInternalContextProps>({
    previewMode: false,
    setPreviewMode: () => {},
    previewEnvironmentData: undefined,
    setPreviewEnvironmentData: () => {},
  });

export function ThonLabsInternalProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  const [previewMode, setPreviewMode] = React.useState(false);
  const [previewEnvironmentData, setPreviewEnvironmentData] = React.useState<
    EnvironmentData | undefined
  >(undefined);

  return (
    <ThonLabsInternalContext.Provider
      value={{
        previewMode,
        setPreviewMode,
        previewEnvironmentData,
        setPreviewEnvironmentData,
      }}
    >
      <SWRConfig>{children}</SWRConfig>
    </ThonLabsInternalContext.Provider>
  );
}
