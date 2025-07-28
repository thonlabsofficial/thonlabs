import { cn } from '@repo/ui/core/utils';
import type React from 'react';
import Container from '@/_components/container';

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
  const defaultClassName = cn({ 'px-3 mt-8': withPadding }, className);
  return (
    <div>
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
