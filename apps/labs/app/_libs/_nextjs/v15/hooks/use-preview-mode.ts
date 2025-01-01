import React from 'react';
import { ThonLabsInternalContext } from '../core/thonlabs-internal-provider';

export function usePreviewMode() {
  const {
    previewMode,
    previewEnvironmentData,
    setPreviewMode,
    setPreviewEnvironmentData,
  } = React.useContext(ThonLabsInternalContext);

  return {
    previewMode,
    previewEnvironmentData,
    setPreviewMode,
    setPreviewEnvironmentData,
  };
}
