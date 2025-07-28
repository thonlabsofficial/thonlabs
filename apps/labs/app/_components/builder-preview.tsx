'use client';

import { ButtonGroup, ButtonGroupItem } from '@repo/ui/button-group';
import { Card, CardContent } from '@repo/ui/card';
import { cn } from '@repo/ui/core/utils';
import { ThonLabsAuthPagePreview } from '@thonlabs/nextjs';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import BuilderActivatePreviewMode from '@/_components/builder-activate-preview-mode';
import SectionHeader from '@/_components/section-header';

export default function BuilderPreview() {
  const { resolvedTheme } = useTheme();
  const [page, setPage] = useState('login');
  const [previewTheme, setPreviewTheme] = useState(resolvedTheme);

  React.useEffect(() => {
    if (!previewTheme || previewTheme === 'system') {
      setPreviewTheme(resolvedTheme);
    }
  }, [resolvedTheme, previewTheme]);

  return (
    <>
      <div className='mb-3 flex items-center justify-between'>
        <SectionHeader title='Preview' className='mb-0' />
        <div className='flex items-center gap-1'>
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
              <Sun className='h-4 w-4' />
            </ButtonGroupItem>
            <ButtonGroupItem
              onClick={() => setPreviewTheme('dark')}
              active={previewTheme === 'dark'}
            >
              <Moon className='h-4 w-4' />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </div>
      <Card className='relative h-[53rem] overflow-hidden'>
        <CardContent
          className={cn('h-full w-full bg-background p-0', previewTheme)}
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
