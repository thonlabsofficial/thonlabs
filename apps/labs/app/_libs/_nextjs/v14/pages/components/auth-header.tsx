'use client';

import React from 'react';
import { Typo } from '@repo/ui/typo';
import { cn } from '@repo/ui/core/utils';
import { useEnvironmentData } from '../../hooks/use-environment-data';

type Props = {
  title: React.ReactNode;
  description?: 'login' | 'signUp' | string;
};

export default function AuthHeader({
  title,
  description,
  className,
  ...props
}: Props & React.HTMLAttributes<HTMLElement>) {
  const { appName } = useEnvironmentData();

  const descriptionMapper = {
    login: `Log in to ${appName}`,
    signUp: `Create an account to ${appName}`,
  };

  return (
    <header {...props} className={cn('flex flex-col gap-1', className)}>
      <Typo variant={'h2'}>{title}</Typo>
      {description && (
        <Typo variant={'muted'} className="!text-gray-400">
          {descriptionMapper[description as keyof typeof descriptionMapper]
            ? descriptionMapper[description as keyof typeof descriptionMapper]
            : description}
        </Typo>
      )}
    </header>
  );
}
