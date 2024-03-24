import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/ui//libs/utils';

const typoVariants = cva('font-sans text-zinc-800', {
  variants: {
    variant: {
      default: '',
      paragraph: 'leading-relaxed [&:not(:first-child)]:mt-5 mb-0',
      h1: 'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-zinc-900',
      h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-zinc-900',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight text-zinc-900',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight text-zinc-900',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      inlineCode:
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      code: 'font-code text-emerald-200 text-sm',
      paragraphEmail: 'leading-relaxed',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TypoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typoVariants> {
  as?: keyof JSX.IntrinsicElements;
}

function Typo({ className, variant, as = 'span', ...props }: TypoProps) {
  return React.createElement(as, {
    ...props,
    className: cn(typoVariants({ variant }), className),
  });
}

export { Typo, typoVariants };
