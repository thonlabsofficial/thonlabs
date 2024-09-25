import React from 'react';
import { cn } from '@repo/ui/core/utils';
import dynamic from 'next/dynamic';
import { Button } from '@repo/ui/button';
import JoinWaitlistDialog from './join-waitlist-dialog';
import * as motion from 'framer-motion/client';
const Logo = dynamic(() => import('@repo/ui/logo'), { ssr: false });

export default function MainHeader({
  className,
  ...props
}: React.ComponentProps<typeof motion.header>) {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
      className={cn(
        `fixed top-0 left-0 z-40 p-4 w-full flex items-center 
         justify-between bg-background`,
        className,
      )}
    >
      <div className="flex items-center gap-1">
        <Logo />
      </div>

      <JoinWaitlistDialog
        trigger={<Button className="hidden lg:flex">Join Waitlist</Button>}
      />
    </motion.header>
  );
}
