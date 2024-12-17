'use client';

import * as React from 'react';
import * as DrawerPrimitive from '@radix-ui/react-dialog';
import { cn } from '../core/utils';
import { X } from 'lucide-react';

const Drawer = ({
  open,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>) => {
  React.useEffect(() => {
    window.document.body.style.pointerEvents = 'auto';
  }, [open]);

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
      'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
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
        `
        fixed w-[26rem] top-0 z-50 flex
        flex-col bg-card !select-auto !cursor-auto 
        inset-y-0 right-0 h-full border-l
        data-[state=open]:animate-slide-fade-in-from-right 
        data-[state=closed]:animate-slide-fade-out-to-right
      `,
        className,
      )}
      {...props}
    >
      {children}
      <DrawerPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
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
      `
      fixed top-0 z-50 inset-y-0 right-0 h-full
      data-[state=open]:animate-slide-fade-in-from-right 
      data-[state=closed]:animate-slide-fade-out-to-right
    `,
      className,
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
      `
      fixed w-[26rem] top-0 z-50 flex
      flex-col bg-card !select-auto !cursor-auto 
      inset-y-0 right-0 h-full border-l sm:max-w-sm
      data-[state=open]:animate-slide-fade-in-from-right 
      data-[state=closed]:animate-slide-fade-out-to-right
    `,
      className,
    )}
    {...props}
  >
    {children}
    <DrawerPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
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
      `
      fixed w-[60vw] top-0 right-[24rem] z-50 flex
      flex-col bg-card !select-auto !cursor-auto 
      inset-y-0 h-full p-4
      data-[state=open]:animate-slide-fade-in-from-right 
      data-[state=closed]:animate-slide-fade-out-to-right
    `,
      className,
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
      'grid gap-1.5 text-center sm:text-left pl-5 pr-12 pt-5 pb-5 mb-6 border-b',
      className,
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
        'flex gap-3 pt-6 p-4',
        {
          'justify-between': multipleChildren,
          'justify-end': !multipleChildren,
        },
        className,
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
    className={cn('text-lg font-semibold text-foreground', className)}
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
    className={cn('text-sm text-muted-foreground', className)}
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
    <div className="w-full">{children}</div>
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
