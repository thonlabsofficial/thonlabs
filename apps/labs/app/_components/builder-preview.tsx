'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@repo/ui/card';
import { ThonLabsAuthPagePreview } from '@/_libs/_nextjs';
import BuilderActivatePreviewMode from '@/_components/builder-activate-preview-mode';
import { ButtonGroup, ButtonGroupItem } from '@repo/ui/button-group';
import SectionHeader from '@/_components/section-header';

export default function BuilderPreview() {
  const [page, setPage] = useState('login');

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <SectionHeader title="Preview" className="mb-0" />
        <ButtonGroup>
          <ButtonGroupItem
            onClick={() => setPage('login')}
            active={page === 'login'}
          >
            Login
          </ButtonGroupItem>
          <ButtonGroupItem
            onClick={() => setPage('sign-up')}
            active={page === 'sign-up'}
          >
            Sign Up
          </ButtonGroupItem>
          <ButtonGroupItem
            onClick={() => setPage('reset-password')}
            active={page === 'reset-password'}
          >
            Reset Password
          </ButtonGroupItem>
          <ButtonGroupItem
            onClick={() => setPage('magic')}
            active={page === 'magic'}
          >
            Magic
          </ButtonGroupItem>
        </ButtonGroup>
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
