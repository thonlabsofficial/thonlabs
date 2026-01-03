'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@repo/ui/core/utils';
import { Button } from '@repo/ui/button';
import * as motion from 'framer-motion/client';
import Logo from '@repo/ui/logo';

export default function MainHeader({
  className,
  ...props
}: React.ComponentProps<typeof motion.header>) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
      className={cn(
        `fixed top-0 left-0 z-40 w-full transition-all duration-150 border-b`,
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-border/50'
          : 'bg-transparent border-transparent',
        className,
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          <Logo forceTheme="dark" />
        </div>
        <nav className="hidden lg:flex items-center">
          <a
            href="#features"
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="https://docs.thonlabs.io"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </a>
        </nav>

        {/* Right: Auth buttons */}
        <div className="flex items-center gap-2">
          <a href="https://labs.thonlabs.io/auth/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Log in
            </Button>
          </a>
          <a href="https://labs.thonlabs.io/auth/sign-up">
            <Button size="sm">Sign up</Button>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
