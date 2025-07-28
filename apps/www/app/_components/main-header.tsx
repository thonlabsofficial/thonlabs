import { Button } from '@repo/ui/button';
import { cn } from '@repo/ui/core/utils';
import Logo from '@repo/ui/logo';
import * as motion from 'framer-motion/client';
import type React from 'react';
import JoinWaitlistDialog from './join-waitlist-dialog';

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
        `fixed top-0 left-0 z-40 flex w-full items-center justify-between bg-background p-4`,
        className
      )}
    >
      <div className='flex items-center gap-1'>
        <Logo />
      </div>

      <JoinWaitlistDialog
        trigger={<Button className='hidden lg:flex'>Join Waitlist</Button>}
      />
    </motion.header>
  );
}
