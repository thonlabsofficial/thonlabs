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

function Skeleton(props: React.ComponentProps<typeof ReactLoadingSkeleton>) {
  return <ReactLoadingSkeleton {...props} />;
}

export { Skeleton, SkeletonProvider };
