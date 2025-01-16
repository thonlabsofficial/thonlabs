'use client';

import React from 'react';
import { EnvironmentData } from '../../shared/interfaces/environment-data';

export interface ThonLabsPreviewContextProps {
  previewMode?: boolean;
  setPreviewMode: (previewMode: boolean) => void;
  previewEnvironmentData?: EnvironmentData;
  setPreviewEnvironmentData: (previewEnvironmentData: EnvironmentData) => void;
}

export const ThonLabsPreviewContext =
  React.createContext<ThonLabsPreviewContextProps>({
    previewMode: false,
    setPreviewMode: () => {},
    previewEnvironmentData: undefined,
    setPreviewEnvironmentData: () => {},
  });

export function ThonLabsPreviewProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  const [previewMode, setPreviewMode] = React.useState(false);
  const [previewEnvironmentData, setPreviewEnvironmentData] = React.useState<
    EnvironmentData | undefined
  >(undefined);

  return (
    <ThonLabsPreviewContext.Provider
      value={{
        previewMode,
        setPreviewMode,
        previewEnvironmentData,
        setPreviewEnvironmentData,
      }}
    >
      {children}
    </ThonLabsPreviewContext.Provider>
  );
}
