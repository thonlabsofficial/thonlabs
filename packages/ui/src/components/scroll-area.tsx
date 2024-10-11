'use client';

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '../core/utils';

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  {
    scrollBackground?: string;
    forceMount?: React.ComponentProps<
      typeof ScrollAreaPrimitive.ScrollAreaScrollbar
    >['forceMount'];
  } & React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, scrollBackground, forceMount, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className="relative overflow-hidden"
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      className={cn('h-full w-full rounded-[inherit]', className)}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar background={scrollBackground} forceMount={forceMount} />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  { background?: string } & React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  >
>(
  (
    { className, orientation = 'vertical', background = 'bg-border', ...props },
    ref,
  ) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent p-[1px]',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={cn('relative flex-1 rounded-full', background)}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  ),
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
