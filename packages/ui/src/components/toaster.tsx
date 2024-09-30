'use client';

import { CheckCircle, CircleAlert, Info } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `
            group toast group-[.toaster]:text-foreground 
            group-[.toaster]:border group-[.toaster]:border-border 
            group-[.toaster]:shadow-lg group-[.toaster]:rounded-md 
            group-[.toaster]:px-3 group-[.toaster]:text-sm 
            group-[.toaster]:font-medium group-[.toaster]:text-text
          `,
          default: `group-[.toaster]:bg-card group-[.toaster]:border-foreground/20`,
          success: `group-[.toaster]:!bg-success group-[.toaster]:!border-success/60`,
          error: `group-[.toaster]:!bg-destructive group-[.toaster]:!border-destructive/50`,
          info: `group-[.toaster]:!bg-info group-[.toaster]:!border-info/50`,
          icon: `group-[.toaster]:!text-foreground`,
          title: `group-[.toast]:text-foreground group-[.toast]:text-sm group-[.toast]:font-sans group-[.toast]:font-semibold`,
          description: `group-[.toast]:font-sans group-[.toast]:text-foreground`,
          actionButton: `group-[.toast]:bg-primary group-[.toast]:text-primary-foreground`,
          cancelButton: `group-[.toast]:bg-muted group-[.toast]:text-muted-foreground`,
          closeButton: `
              group-[.toast]:!text-foreground
              group-[.toast]:!bg-transparent
              group-[.toast]:absolute group-[.toast]:left-auto group-[.toast]:right-0 group-[.toast]:top-3 
              group-[.toast]:rounded-md group-[.toast]:p-1 group-[.toast]:opacity-0
              group-[.toast]:group-hover:opacity-100 group-[.toast]:focus:outline-none group-[.toast]:focus:ring-1 
              group-[.toast]:border-none group-[.toast]:bg-transparent
              group-[.toast]:focus:ring-0
              group-[.toast]:transition-default
              group-[.toast]:hover:!bg-foreground/10
              group-data-[type=info]:hover:!bg-foreground/10
              group-data-[type=success]:hover:!bg-foreground/10
              group-data-[type=error]:hover:!bg-foreground/10
            `,
        },
      }}
      icons={{
        success: <CheckCircle className="w-5 h-5" />,
        error: <CircleAlert className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
