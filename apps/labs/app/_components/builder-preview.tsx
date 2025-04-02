'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@repo/ui/card';
import { ThonLabsAuthPagePreview } from '@thonlabs/nextjs';
import BuilderActivatePreviewMode from '@/_components/builder-activate-preview-mode';
import { ButtonGroup, ButtonGroupItem } from '@repo/ui/button-group';
import SectionHeader from '@/_components/section-header';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@repo/ui/core/utils';

export default function BuilderPreview() {
  const { resolvedTheme } = useTheme();
  const [page, setPage] = useState('login');
  const [previewTheme, setPreviewTheme] = useState(resolvedTheme);

  React.useEffect(() => {
    if (!previewTheme || previewTheme === 'system') {
      setPreviewTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <SectionHeader title="Preview" className="mb-0" />
        <div className="flex gap-1 items-center">
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
          <ButtonGroup>
            <ButtonGroupItem
              onClick={() => setPreviewTheme('light')}
              active={previewTheme === 'light'}
            >
              <Sun className="w-4 h-4" />
            </ButtonGroupItem>
            <ButtonGroupItem
              onClick={() => setPreviewTheme('dark')}
              active={previewTheme === 'dark'}
            >
              <Moon className="w-4 h-4" />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </div>
      <Card className="h-[46rem] overflow-hidden relative">
        <CardContent
          className={cn('p-0 w-full h-full bg-background', previewTheme)}
        >
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
