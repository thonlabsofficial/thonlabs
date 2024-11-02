import Container from '@/_components/container';
import { cn } from '@repo/ui/core/utils';
import React from 'react';

type Props = {
  withContainer?: boolean;
  withPadding?: boolean;
};

export default function PageWrapper({
  children,
  className,
  withContainer = true,
  withPadding = true,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const defaultClassName = cn({ 'px-3 py-2': withPadding }, className);
  return (
    <div className="pl-64">
      {withContainer ? (
        <Container className={defaultClassName} withGutter={false}>
          {children}
        </Container>
      ) : (
        <div className={defaultClassName}>{children}</div>
      )}
    </div>
  );
}
