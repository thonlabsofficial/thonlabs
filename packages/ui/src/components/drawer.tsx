'use client';

import * as DrawerPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../core/utils';

const Drawer = ({
  open,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>) => {
  React.useEffect(() => {
    window.document.body.style.pointerEvents = 'auto';
  }, []);

  return <DrawerPrimitive.Root open={open} {...props} />;
};

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerClose = DrawerPrimitive.Close;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    className={cn(
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in',
      className
    )}
    {...props}
    ref={ref}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        `!select-auto !cursor-auto fixed inset-y-0 top-0 right-0 z-50 flex h-full w-[26rem] flex-col border-l bg-card data-[state=closed]:animate-slide-fade-out-to-right data-[state=open]:animate-slide-fade-in-from-right `,
        className
      )}
      {...props}
    >
      {children}
      <DrawerPrimitive.Close className='absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </DrawerPrimitive.Close>
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = DrawerPrimitive.Content.displayName;

const DrawerContentWrapper = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Content
    ref={ref}
    className={cn(
      `fixed inset-y-0 top-0 right-0 z-50 h-full data-[state=closed]:animate-slide-fade-out-to-right data-[state=open]:animate-slide-fade-in-from-right `,
      className
    )}
    {...props}
  >
    <DrawerOverlay />
    {children}
  </DrawerPrimitive.Content>
));
DrawerContentWrapper.displayName = 'DrawerContentWrapper';

const DrawerMainContent = React.forwardRef<
  React.ElementRef<'div'>,
  DrawerContentProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `!select-auto !cursor-auto fixed inset-y-0 top-0 right-0 z-50 flex h-full w-[26rem] flex-col border-l bg-card data-[state=closed]:animate-slide-fade-out-to-right data-[state=open]:animate-slide-fade-in-from-right sm:max-w-sm `,
      className
    )}
    {...props}
  >
    {children}
    <DrawerPrimitive.Close className='absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
      <X className='h-4 w-4' />
      <span className='sr-only'>Close</span>
    </DrawerPrimitive.Close>
  </div>
));
DrawerMainContent.displayName = 'DrawerMainContent';

const DrawerComplementaryContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `!select-auto !cursor-auto fixed inset-y-0 top-0 right-[24rem] z-50 flex h-full w-[60vw] flex-col bg-card p-4 data-[state=closed]:animate-slide-fade-out-to-right data-[state=open]:animate-slide-fade-in-from-right `,
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DrawerComplementaryContent.displayName = 'DrawerComplementaryContent';

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mb-6 grid gap-1.5 border-b pt-5 pr-12 pb-5 pl-5 sm:text-left',
      className
    )}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const multipleChildren = React.Children.count(props.children) > 1;
  return (
    <div
      className={cn(
        'flex gap-3 p-4 pt-6',
        {
          'justify-between': multipleChildren,
          'justify-end': !multipleChildren,
        },
        className
      )}
      {...props}
    />
  );
};
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('font-semibold text-foreground text-lg', className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

const DrawerScrollArea = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <div
    className={cn('flex h-[calc(100%-4.5rem)]', className)}
    {...props}
    ref={ref}
  >
    <div className='w-full'>{children}</div>
  </div>
));
DrawerScrollArea.displayName = 'DrawerScrollArea';

const DrawerContentContainer = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <div className={cn('px-5', className)} {...props} ref={ref}>
    {children}
  </div>
));
DrawerContentContainer.displayName = 'DrawerContentContainer';

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerScrollArea,
  DrawerContentContainer,
  DrawerContentWrapper,
  DrawerMainContent,
  DrawerComplementaryContent,
};
