'use client';

import { Card } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import * as motion from 'framer-motion/client';
import { Clock, Code2, DollarSign, ShieldX } from 'lucide-react';

const problems = [
  {
    icon: Clock,
    title: 'Weeks Lost to Auth',
    description:
      "Every new SaaS project starts the same way: 2-4 weeks building login, signup, password reset, sessions. That's a month of shipping wasted on solved problems.",
    agitation:
      "Your competitors are shipping features while you're debugging JWT tokens.",
  },
  {
    icon: DollarSign,
    title: 'Enterprise Costs, Startup Budget',
    description:
      'Auth0 and Clerk charge $100+/month for basic features. Add organizations and SSO? That\'s $500+/month before you have paying customers.',
    agitation:
      "You're burning runway on infrastructure instead of growth.",
  },
  {
    icon: ShieldX,
    title: 'Security Nightmares',
    description:
      "One auth vulnerability can destroy your company. Rolling your own auth means owning every security flaw you didn't know you had.",
    agitation:
      "When the breach happens, 'we built it ourselves' isn't an excuse.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Typo variant="h2" className="mb-4">
            Building Auth Is a{' '}
            <span className="text-destructive">Trap</span>
          </Typo>
          <Typo variant="lead" className="max-w-2xl mx-auto">
            You didn't start a company to become an auth expert. Yet here you
            are, debugging session tokens at 2 AM.
          </Typo>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-6 bg-card hover:bg-card/80 transition-colors border-destructive/20 hover:border-destructive/40">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                    <problem.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <Typo variant="h4" className="mb-3 text-lg">
                    {problem.title}
                  </Typo>
                  <Typo variant="muted" className="mb-4 flex-grow">
                    {problem.description}
                  </Typo>
                  <div className="pt-4 border-t border-border">
                    <Typo variant="sm" className="text-destructive/80 italic">
                      "{problem.agitation}"
                    </Typo>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Transition line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card border">
            <Code2 className="w-5 h-5 text-primary" />
            <Typo variant="md" className="text-muted-foreground">
              What if you could skip all of this?
            </Typo>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
