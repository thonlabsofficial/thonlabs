'use client';

import * as motion from 'framer-motion/client';
import {
  Fingerprint,
  Zap,
  Shield,
  Code2,
  Users,
  Palette,
  Mail,
  Building2,
} from 'lucide-react';
import { cn } from '@repo/ui/core/utils';

const features = [
  {
    icon: Zap,
    title: 'Minutes, Not Days',
    description:
      'Get authentication running in your SaaS in under 5 minutes. No complex configuration, just works.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-500',
  },
  {
    icon: Fingerprint,
    title: 'Multi-Provider Auth',
    description:
      'Email, Google, GitHub, and more. Let your users sign in the way they prefer.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Built-in MFA, session management, and security best practices out of the box.',
    gradient: 'from-emerald-500/20 to-green-500/20',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Building2,
    title: 'Multi-Tenant Ready',
    description:
      'Organizations, teams, and role-based access control. Perfect for B2B SaaS.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-500',
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description:
      'White-label everything. Match your brand with custom themes and styling.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-500',
  },
  {
    icon: Mail,
    title: 'Transactional Emails',
    description:
      'Beautiful, customizable email templates for verification, magic links, and more.',
    gradient: 'from-sky-500/20 to-indigo-500/20',
    iconColor: 'text-sky-500',
  },
  {
    icon: Code2,
    title: 'TypeScript First',
    description:
      'Full type safety with excellent DX. Autocomplete everything, catch errors at build time.',
    gradient: 'from-slate-500/20 to-gray-500/20',
    iconColor: 'text-slate-400',
  },
  {
    icon: Users,
    title: 'User Management',
    description:
      'Complete dashboard for managing users, sessions, and permissions. No extra tools needed.',
    gradient: 'from-teal-500/20 to-cyan-500/20',
    iconColor: 'text-teal-500',
  },
];

export default function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <div
            className={cn(
              'group relative h-full p-6 rounded-xl border border-border/50',
              'bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-sm',
              'hover:border-border transition-all duration-300',
              'hover:shadow-lg hover:shadow-black/5'
            )}
          >
            {/* Gradient glow on hover */}
            <div
              className={cn(
                'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                `bg-gradient-to-br ${feature.gradient}`,
                'blur-xl -z-10'
              )}
            />

            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center mb-4',
                'bg-gradient-to-br',
                feature.gradient
              )}
            >
              <feature.icon className={cn('w-5 h-5', feature.iconColor)} />
            </div>

            <h3 className="font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
