'use client';

import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import * as motion from 'framer-motion/client';
import { ArrowRight, Sparkles } from 'lucide-react';
import React from 'react';
import JoinWaitlistDialog from '../join-waitlist-dialog';

const avatars = [
  { initials: 'JD', color: 'bg-primary' },
  { initials: 'SK', color: 'bg-info' },
  { initials: 'MR', color: 'bg-success' },
  { initials: 'AL', color: 'bg-warning' },
  { initials: 'TC', color: 'bg-destructive' },
];

export default function CtaSection() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <section className="relative py-24 lg:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="relative overflow-hidden p-8 md:p-12 text-center border-primary/30">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />

            {/* Avatar stack */}
            <div className="flex justify-center mb-6">
              <div className="flex -space-x-3">
                {avatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    size="sm"
                    className={`border-2 border-background ${avatar.color}`}
                  >
                    <AvatarFallback className={avatar.color}>
                      {avatar.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <div className="w-8 h-8 rounded-full bg-card border-2 border-background flex items-center justify-center text-xs font-semibold">
                  +500
                </div>
              </div>
            </div>

            {/* Question headline */}
            <Typo variant="h2" className="mb-4">
              Ready to{' '}
              <span className="text-primary">Ship Faster?</span>
            </Typo>

            <Typo variant="lead" className="mb-8 max-w-xl mx-auto">
              Join 500+ developers who've already claimed their spot on the
              waitlist. Early access includes priority support and founding
              member pricing.
            </Typo>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="min-w-[220px] group"
                onClick={() => setIsDialogOpen(true)}
              >
                <Sparkles className="w-5 h-5" />
                Yes, I Want Early Access
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Urgency note */}
            <Typo variant="muted" className="mt-6">
              No spam. Unsubscribe anytime. We respect your inbox.
            </Typo>
          </Card>
        </motion.div>
      </div>

      <JoinWaitlistDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
}
