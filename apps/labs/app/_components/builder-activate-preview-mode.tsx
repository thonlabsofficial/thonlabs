'use client';

import { usePreviewMode } from '@thonlabs/nextjs';
import React from 'react';

export default function BuilderActivatePreviewMode() {
  const { setPreviewMode } = usePreviewMode();

  React.useEffect(() => {
    setPreviewMode(true);
  }, [setPreviewMode]);

  return null;
}
