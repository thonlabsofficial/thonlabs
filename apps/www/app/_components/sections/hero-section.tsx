'use client';

import { Badge } from '@repo/ui/badge';
import { Button } from '@repo/ui/button';
import { Typo } from '@repo/ui/typo';
import * as motion from 'framer-motion/client';
import { SiGithub } from 'react-icons/si';
import { ArrowRight, Star, Users, Zap } from 'lucide-react';
import JoinWaitlistDialog from '../join-waitlist-dialog';
import React from 'react';

const trustSignals = [
  { icon: Star, label: 'Open Source' },
  { icon: Users, label: '500+ Waitlist' },
  { icon: Zap, label: 'Ship in Minutes' },
];

export default function HeroSection() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* Gradient orbs background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-info/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-primary/10 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-24 lg:pt-32 lg:pb-36">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-6"
        >
          <Badge size="lg" className="gap-2 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Building In Public · Join 500+ on Waitlist
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mx-auto max-w-4xl mb-6"
        >
          <Typo
            variant="h1"
            className="text-4xl md:text-5xl lg:text-6xl !leading-tight tracking-tight"
          >
            Stop Building Auth.
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-info bg-clip-text text-transparent">
              Start Shipping Products.
            </span>
          </Typo>
        </motion.div>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mx-auto max-w-2xl mb-10"
        >
          <Typo variant="lead" className="text-lg md:text-xl">
            ThonLabs is the open-source auth platform that gives your SaaS
            plug-and-play authentication, user management, and organizations —
            all in minutes, not months.
          </Typo>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button size="lg" className="min-w-[200px] group" onClick={() => setIsDialogOpen(true)}>
            Get Early Access
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <a
            href="https://git.new/thonlabs?utm_source=website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="min-w-[200px] gap-2">
              <SiGithub className="w-5 h-5" />
              Star on GitHub
            </Button>
          </a>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
        >
          {trustSignals.map((signal, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <signal.icon className="w-4 h-4 text-primary" />
              <span>{signal.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Decorative code snippet preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 mx-auto max-w-3xl"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-info/50 to-primary/50 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-card border rounded-xl p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-warning/80" />
                <div className="w-3 h-3 rounded-full bg-success/80" />
                <span className="ml-2 text-muted-foreground text-xs">
                  app/page.tsx
                </span>
              </div>
              <pre className="text-muted-foreground overflow-x-auto">
                <code>
                  <span className="text-info">import</span>
                  {' { ThonLabs } '}
                  <span className="text-info">from</span>
                  {" '@thonlabs/nextjs'\n\n"}
                  <span className="text-primary">// That's it. Auth is ready.</span>
                  {'\n'}
                  <span className="text-info">export default</span>
                  {' ThonLabs.withAuth(App)'}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>

      <JoinWaitlistDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
}
