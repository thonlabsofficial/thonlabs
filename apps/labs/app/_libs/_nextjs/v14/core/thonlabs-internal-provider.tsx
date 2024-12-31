'use client';

import { SWRConfig } from 'swr';

export function ThonLabsInternalProvider({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return <SWRConfig>{children}</SWRConfig>;
}
