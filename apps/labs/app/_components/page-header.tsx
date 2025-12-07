import { cn } from '@repo/ui/core/utils';
import { Typo } from '@repo/ui/typo';
import React from 'react';
import Container from './container';

type Props = {
  title: React.ReactNode;
  icon?: any;
  description?: React.ReactNode;
  withContainer?: boolean;
  actions?: React.ReactNode;
};

export default function PageHeader({
  title,
  icon: Icon,
  description,
  withContainer = false,
  actions,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const body = React.useMemo(
    () => (
      <div
        className={cn('flex items-center justify-between py-5', {
          'px-3': !withContainer,
        })}
      >
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-md bg-foreground/5 flex items-center justify-center border border-foreground/[0.05]">
            <Icon className="w-4 h-4" />
          </div>

          <div className="flex flex-col">
            <Typo as="h2" variant={'h4'}>
              {title}
            </Typo>
            {description && <Typo variant={'muted'}>{description}</Typo>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    ),
    [withContainer],
  );

  return (
    <header className="bg-card border-b">
      {withContainer ? <Container>{body}</Container> : body}
    </header>
  );
}
