'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@repo/ui/card';
import { ThonLabsAuthPagePreview } from '@/_libs/_nextjs';
import BuilderActivatePreviewMode from '@/_components/builder-activate-preview-mode';
import { Button } from '@repo/ui/button';

export default function BuilderPreview() {
  const [page, setPage] = useState('login');

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => setPage('login')}>Login</Button>
        <Button onClick={() => setPage('sign-up')}>Sign Up</Button>
        <Button onClick={() => setPage('reset-password')}>
          Reset Password
        </Button>
        <Button onClick={() => setPage('magic')}>Magic</Button>
      </div>
      <Card className="h-[46rem] overflow-hidden relative">
        <CardContent className="p-0 w-full h-full">
          <BuilderActivatePreviewMode />
          <ThonLabsAuthPagePreview
            params={{ thonlabs: [page] }}
            searchParams={{}}
          />
        </CardContent>
      </Card>
    </>
  );
}
