'use client';

import * as motion from 'framer-motion/client';
import { Badge } from '@repo/ui/badge';
import {
  Rocket,
  Building2,
  Mail,
  Database,
  ArrowRight,
  ImageIcon,
} from 'lucide-react';
import { cn } from '@repo/ui/core/utils';

const features = [
  {
    id: 'quick-setup',
    badge: 'Quick Setup',
    title: 'Auth ready in 5 steps',
    description:
      'From zero to fully functional authentication in minutes. Install the SDK, configure your project, and you\'re live. No complex setup, no configuration hell.',
    icon: Rocket,
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-500',
    imagePlaceholder: 'Setup wizard screenshot',
    highlights: [
      'One-command installation',
      'Auto-configured middleware',
      'Ready-to-use components',
    ],
  },
  {
    id: 'organizations',
    badge: 'Multi-Tenant',
    title: 'Organizations & Teams',
    description:
      'Built-in support for B2B SaaS. Create organizations, invite team members, assign roles, and manage permissions. Everything you need for enterprise customers.',
    icon: Building2,
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-500',
    imagePlaceholder: 'Organizations dashboard screenshot',
    highlights: [
      'Team invitations',
      'Role-based access control',
      'Organization settings',
    ],
  },
  {
    id: 'emails',
    badge: 'Transactional Emails',
    title: 'Beautiful Email Templates',
    description:
      'Customizable email templates for verification, password reset, magic links, and team invitations. Match your brand with our visual editor.',
    icon: Mail,
    gradient: 'from-sky-500/20 to-blue-500/20',
    iconColor: 'text-sky-500',
    imagePlaceholder: 'Email template editor screenshot',
    highlights: [
      'Visual email editor',
      'Custom branding',
      'Delivery tracking',
    ],
  },
  {
    id: 'metadata',
    badge: 'User Data',
    title: 'Flexible Metadata',
    description:
      'Store custom user data without managing a separate database. Attach any JSON metadata to users, organizations, and sessions. Query and update on the fly.',
    icon: Database,
    gradient: 'from-emerald-500/20 to-green-500/20',
    iconColor: 'text-emerald-500',
    imagePlaceholder: 'Metadata configuration screenshot',
    highlights: [
      'Custom user fields',
      'Organization metadata',
      'Session data storage',
    ],
  },
];

function FeatureImagePlaceholder({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative aspect-[16/10] rounded-xl overflow-hidden',
        'border border-border/50 bg-gradient-to-br from-muted/30 to-muted/50',
        'flex items-center justify-center',
        className,
      )}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Placeholder content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center p-6">
        <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <span className="text-sm text-muted-foreground">{text}</span>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export default function FeatureShowcase() {
  return (
    <section id="features" className="px-4 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-20"
        >
          <Badge className="mb-4">Platform Features</Badge>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl mb-4">
            Built for real products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Every feature designed around actual SaaS needs. No bloat, just the
            tools you'll actually use.
          </p>
        </motion.div>

        <div className="space-y-32">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={cn(
                  'grid lg:grid-cols-2 gap-12 lg:gap-20 items-center',
                  !isEven && 'lg:grid-flow-dense',
                )}
              >
                {/* Content */}
                <div className={cn(!isEven && 'lg:col-start-2')}>
                  <div className="mb-4">
                    <Badge
                      className={cn(
                        `bg-gradient-to-r ${feature.gradient} border-transparent`,
                      )}
                    >
                      {feature.badge}
                    </Badge>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {feature.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <div
                          className={cn(
                            'w-6 h-6 rounded-full flex items-center justify-center',
                            `bg-gradient-to-br ${feature.gradient}`,
                          )}
                        >
                          <ArrowRight
                            className={cn('w-3 h-3', feature.iconColor)}
                          />
                        </div>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`https://docs.thonlabs.io/features/${feature.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Image */}
                <div className={cn(!isEven && 'lg:col-start-1')}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <FeatureImagePlaceholder text={feature.imagePlaceholder} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

