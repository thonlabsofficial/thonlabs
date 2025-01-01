'use client';

import { Button } from '@repo/ui/button';
import { useSearchParams } from 'next/navigation';

export function CloseThisPageButton() {
  const searchParams = useSearchParams();
  const previewMode = searchParams.get('previewMode') === 'true';

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
