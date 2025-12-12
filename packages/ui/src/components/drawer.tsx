'use client';

import * as React from 'react';
import * as DrawerPrimitive from '@radix-ui/react-dialog';
import { cn } from '../core/utils';
import { X } from 'lucide-react';
import { ScrollArea } from './scroll-area';

const DrawerDepthContext = React.createContext(0);

const Drawer = ({
  open,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>) => {
  const depth = React.useContext(DrawerDepthContext);

  React.useEffect(() => {
    window.document.body.style.pointerEvents = 'auto';
  }, [open]);

  return (
    <DrawerDepthContext.Provider value={depth + 1}>
      <DrawerPrimitive.Root open={open} {...props} />
    </DrawerDepthContext.Provider>
  );
};

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerClose = DrawerPrimitive.Close;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerOverlay = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & {
  ref?: React.Ref<React.ElementRef<typeof DrawerPrimitive.Overlay>>;
}) => (
  <DrawerPrimitive.Overlay
    className={cn(
      `fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in 
      data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`,
      className,
    )}
    {...props}
    ref={ref}
  />
);

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  ref?: React.Ref<React.ElementRef<typeof DrawerPrimitive.Content>>;
}

const DrawerContent = ({
  className,
  children,
  ref,
  ...props
}: DrawerContentProps) => {
  const depth = React.useContext(DrawerDepthContext);

  return (
    <DrawerPortal>
      {depth <= 1 && <DrawerOverlay />}
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          `
        fixed w-[50rem] top-0 z-50 flex
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
  );
};

const DrawerContentWrapper = ({
  className,
  children,
  ref,
  ...props
}: DrawerContentProps) => {
  const depth = React.useContext(DrawerDepthContext);

  return (
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
      {depth <= 1 && <DrawerOverlay />}
      {children}
    </DrawerPrimitive.Content>
  );
};

const DrawerMainContent = ({
  className,
  children,
  ref,
  ...props
}: DrawerContentProps & { ref?: React.Ref<HTMLDivElement> }) => (
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
);

const DrawerComplementaryContent = ({
  className,
  children,
  ref,
  ...props
}: DrawerContentProps & { ref?: React.Ref<HTMLDivElement> }) => (
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
);

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('grid sm:text-left pl-5 pr-12 pt-5 pb-5 border-b', className)}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  // const multipleChildren = React.Children.count(props.children) > 1;
  return (
    <div
      className={cn(
        'flex gap-3 pt-6 p-4 justify-end',
        // {
        //   'justify-between': multipleChildren,
        //   'justify-end': !multipleChildren,
        // },
        className,
      )}
      {...props}
    />
  );
};
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> & {
  ref?: React.Ref<React.ElementRef<typeof DrawerPrimitive.Title>>;
}) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
);

const DrawerDescription = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> & {
  ref?: React.Ref<React.ElementRef<typeof DrawerPrimitive.Description>>;
}) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);

const DrawerScrollArea = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>) => (
  <ScrollArea wrapperClassName="h-[calc(100%-4rem)]">
    <div className="w-full">{children}</div>
  </ScrollArea>
);

const DrawerContentContainer = ({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
  ref?: React.Ref<HTMLDivElement>;
}) => (
  <div className={cn('p-5', className)} {...props} ref={ref}>
    {children}
  </div>
);

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
