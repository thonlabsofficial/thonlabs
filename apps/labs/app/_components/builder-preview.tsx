import React from 'react';
import { Card, CardContent } from '@repo/ui/card';
import SectionHeader from '@/_components/section-header';
import { ThonLabsAuthPage } from '@/_libs/_nextjs';
import BuilderActivatePreviewMode from '@/_components/builder-activate-preview-mode';

export default function BuilderPreview() {
  const currentURL =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3000';

  return (
    <>
      <SectionHeader title="Preview" />
      <Card className="h-[46rem] overflow-hidden relative">
        <CardContent className="p-0 w-full h-full">
          <BuilderActivatePreviewMode />
          <ThonLabsAuthPage
            params={Promise.resolve({ thonlabs: ['login'] })}
            searchParams={Promise.resolve({})}
          />
        </CardContent>
      </Card>
    </>
  );
}
