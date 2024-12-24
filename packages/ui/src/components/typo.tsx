import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../core/utils';

const typoVariants = cva('font-sans text-text', {
  variants: {
    variant: {
      default: 'text-base font-normal leading-relaxed',
      paragraph: 'leading-relaxed [&:not(:first-child)]:mt-5 mb-0',
      h1: 'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-medium tracking-tight',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      inlineCode:
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-lg text-muted-foreground',
      lg: 'text-lg font-semibold',
      md: 'text-lg font-medium',
      sm: 'text-sm font-medium',
      xs: 'text-xs font-medium',
      muted: 'text-sm text-muted-foreground',
      mutedXs: 'text-xs text-muted-foreground',
      code: 'font-code p-0.5 bg-blue-500/[0.2] rounded-sm text-sm',
      codeLink:
        'font-code py-0.5 px-1 bg-blue-500/[0.2] hover:bg-blue-500/[0.3] rounded-sm text-sm transition-default',
      link: 'underline underline-offset-4 cursor-pointer',
      underline: 'underline underline-offset-4',
    },
    state: {
      default: '',
      error: '!text-red-500',
    },
  },
  defaultVariants: {
    variant: 'default',
    state: 'default',
  },
});

export interface TypoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typoVariants> {
  as?: keyof JSX.IntrinsicElements;
  fallback?: React.ReactNode;
}

function Typo({
  className,
  variant,
  state,
  as = 'span',
  fallback = '-',
  ...props
}: TypoProps) {
  return React.createElement(as, {
    ...props,
    children: props.children || fallback,
    className: cn(typoVariants({ variant, state }), className),
  });
}

export { Typo, typoVariants };
