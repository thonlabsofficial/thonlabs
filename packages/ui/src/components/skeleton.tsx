'use client';

import ReactLoadingSkeleton, { SkeletonTheme } from 'react-loading-skeleton';

function SkeletonProvider({ children }: React.HTMLAttributes<HTMLElement>) {
  return (
    <SkeletonTheme
      baseColor="hsl(var(--skeleton-base))"
      highlightColor="hsl(var(--skeleton-highlight))"
    >
      {children}
    </SkeletonTheme>
  );
}

function SkeletonWrapper({ children }: React.HTMLAttributes<HTMLElement>) {
  return <div className="leading-[0]">{children}</div>;
}

interface SkeletonProps
  extends React.ComponentProps<typeof ReactLoadingSkeleton> {
  forceTheme?: 'dark' | 'light';
}

function Skeleton({ forceTheme, ...props }: SkeletonProps) {
  let skeletonTheme = {};

  if (forceTheme) {
    if (forceTheme === 'light') {
      skeletonTheme = {
        baseColor: 'hsl(0 0% 90%)',
        highlightColor: 'hsl(0 0% 85%)',
      };
    } else {
      skeletonTheme = {
        baseColor: 'hsl(0 0% 20%)',
        highlightColor: 'hsl(0 0% 24%)',
      };
    }
  }

  return (
    <ReactLoadingSkeleton
      wrapper={SkeletonWrapper}
      {...props}
      {...skeletonTheme}
    />
  );
}

export { Skeleton, SkeletonProvider };
