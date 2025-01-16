import React from 'react';
import { ThonLabsPreviewContext } from '../../shared/providers/thonlabs-preview-provider';

export function usePreviewMode() {
  const {
    previewMode,
    previewEnvironmentData,
    setPreviewMode,
    setPreviewEnvironmentData,
  } = React.useContext(ThonLabsPreviewContext);

  return {
    previewMode,
    previewEnvironmentData,
    setPreviewMode,
    setPreviewEnvironmentData,
  };
}
