'use client';

import { Button } from '@repo/ui/button';
import { usePreviewMode } from '../../../shared/hooks/use-preview-mode';

export function CloseThisPageButton() {
  const { previewMode } = usePreviewMode();

  return (
    <Button
      type="button"
      variant={'secondary'}
      onClick={() => {
        if (!previewMode) {
          window.close();
        }
      }}
    >
      Close this page
    </Button>
  );
}
