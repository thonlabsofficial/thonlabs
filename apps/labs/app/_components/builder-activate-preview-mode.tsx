'use client';

import React from 'react';
import { usePreviewMode } from '@thonlabs/nextjs';

export default function BuilderActivatePreviewMode() {
  const { setPreviewMode } = usePreviewMode();

  React.useEffect(() => {
    setPreviewMode(true);
  }, []);

  return null;
}
