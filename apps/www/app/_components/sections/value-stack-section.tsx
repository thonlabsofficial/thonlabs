'use client';

import { Badge } from '@repo/ui/badge';
import { Card } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import * as motion from 'framer-motion/client';
import {
  Building2,
  Code2,
  KeyRound,
  LayoutDashboard,
  Mail,
  Palette,
  Shield,
  Users,
  Check,
} from 'lucide-react';

const valueStack = [
  {
    tier: 'Core',
    badge: 'Foundation',
    items: [
      {
        icon: KeyRound,
        title: 'Complete Authentication',
        description:
          'Login, signup, password reset, magic links, and social providers. Production-ready from day one.',
      },
      {
        icon: Users,
        title: 'User Management',
        description:
          'User profiles, roles, permissions, and admin controls. Everything you need to manage your users.',
      },
    ],
  },
  {
    tier: 'Growth',
    badge: 'Scale',
    items: [
      {
        icon: Building2,
        title: 'Organizations & Teams',
        description:
          'Multi-tenancy built-in. Let users create workspaces, invite team members, and manage access.',
      },
      {
        icon: Mail,
        title: 'Transactional Emails',
        description:
          'Beautiful, customizable email templates for verification, invites, and password resets.',
      },
    ],
  },
  {
    tier: 'Enterprise',
    badge: 'Pro',
    items: [
      {
        icon: Shield,
        title: 'Enterprise SSO',
        description:
          'SAML, OIDC, and custom SSO providers. Close enterprise deals without 3-month integrations.',
      },
      {
        icon: LayoutDashboard,
        title: 'Admin Dashboard',
        description:
          'Full-featured dashboard to manage users, organizations, and settings. No code required.',
      },
    ],
  },
  {
    tier: 'Developer',
    badge: 'DX',
    items: [
      {
        icon: Code2,
        title: 'SDK & APIs',
        description:
          'TypeScript SDK, REST APIs, and webhooks. Integrate in minutes with your favorite framework.',
      },
      {
        icon: Palette,
        title: 'Full Customization',
        description:
          'Custom domains, white-labeling, and themed components. Make it yours, completely.',
      },
    ],
  },
];

const checklist = [
  'Unlimited users',
  'Unlimited organizations',
  'Custom branding',
  'Email templates',
  'Webhooks & APIs',
  'Priority support',
];

export default function ValueStackSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-muted/30">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge size="lg" variant="success" className="mb-4">
            Everything You Need
          </Badge>
          <Typo variant="h2" className="mb-4">
            One Platform.{' '}
            <span className="text-primary">Complete Auth.</span>
          </Typo>
          <Typo variant="lead" className="max-w-2xl mx-auto">
            From MVP to enterprise, ThonLabs scales with you. No surprise bills,
            no feature gates, no vendor lock-in.
          </Typo>
        </motion.div>

        {/* Value stack grid */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {valueStack.map((tier, tierIndex) => (
            <motion.div
              key={tierIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: tierIndex * 0.1 }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="outline">{tier.badge}</Badge>
                  <Typo variant="h4" className="text-lg">
                    {tier.tier}
                  </Typo>
                </div>
                <div className="space-y-6">
                  {tier.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <Typo variant="baseBold" className="mb-1">
                          {item.title}
                        </Typo>
                        <Typo variant="muted" className="text-sm">
                          {item.description}
                        </Typo>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Value comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 border-primary/30 bg-gradient-to-br from-card via-card to-primary/5">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Typo variant="h3" className="mb-2">
                  The Math Is Simple
                </Typo>
                <Typo variant="muted" className="mb-6">
                  Build auth yourself or pay enterprise prices? Neither.
                </Typo>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <span className="text-sm">DIY Auth (4 weeks @ $150/hr)</span>
                    <span className="font-bold text-destructive line-through">
                      $24,000
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <span className="text-sm">Auth0/Clerk (Annual)</span>
                    <span className="font-bold text-destructive line-through">
                      $6,000+
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                    <span className="text-sm font-semibold">
                      ThonLabs (Open Source)
                    </span>
                    <span className="font-bold text-success">Free*</span>
                  </div>
                </div>
                <Typo variant="mutedXs" className="mt-3">
                  *Self-hosted is free forever. Managed cloud plans starting at $29/mo.
                </Typo>
              </div>
              <div className="bg-card rounded-xl p-6 border">
                <Typo variant="baseBold" className="mb-4">
                  Everything included:
                </Typo>
                <div className="grid grid-cols-2 gap-3">
                  {checklist.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <Typo variant="sm">{item}</Typo>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
