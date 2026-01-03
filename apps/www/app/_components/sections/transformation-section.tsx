'use client';

import { Card } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import * as motion from 'framer-motion/client';
import { ArrowRight, Clock, Rocket, Shield, TrendingUp } from 'lucide-react';

const transformationStages = [
  {
    icon: Clock,
    stage: 'Day 1',
    title: 'Quick Win',
    description: 'Set up complete auth in under 30 minutes',
    outcome: 'Login, signup, and password reset working',
    color: 'info',
  },
  {
    icon: Shield,
    stage: 'Week 1',
    title: 'Compound',
    description: 'Add organizations, invites, and role-based access',
    outcome: 'Multi-tenant ready without extra code',
    color: 'success',
  },
  {
    icon: Rocket,
    stage: 'Month 1',
    title: 'Advantage',
    description: 'Enterprise SSO and custom branding deployed',
    outcome: 'Closing enterprise deals competitors can\'t',
    color: 'primary',
  },
  {
    icon: TrendingUp,
    stage: 'Year 1',
    title: '10x Outcome',
    description: 'Scale to 100k+ users with zero auth headaches',
    outcome: 'Focus on product, not infrastructure',
    color: 'primary',
  },
];

export default function TransformationSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-muted/30">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
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
          <Typo variant="h2" className="mb-4">
            Your Path to{' '}
            <span className="text-primary">Auth Freedom</span>
          </Typo>
          <Typo variant="lead" className="max-w-2xl mx-auto">
            See how ThonLabs transforms your development workflow from day one
            to year one.
          </Typo>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            {transformationStages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < transformationStages.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-border to-border/50 z-0" />
                )}

                <Card className="relative z-10 h-full p-5 hover:shadow-lg transition-all hover:-translate-y-1">
                  {/* Stage badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center
                        ${stage.color === 'info' ? 'bg-info/20 text-info' : ''}
                        ${stage.color === 'success' ? 'bg-success/20 text-success' : ''}
                        ${stage.color === 'primary' ? 'bg-primary/20 text-primary' : ''}
                      `}
                    >
                      <stage.icon className="w-5 h-5" />
                    </div>
                    <Typo
                      variant="xs"
                      className={`
                        px-2 py-1 rounded-full
                        ${stage.color === 'info' ? 'bg-info/10 text-info' : ''}
                        ${stage.color === 'success' ? 'bg-success/10 text-success' : ''}
                        ${stage.color === 'primary' ? 'bg-primary/10 text-primary' : ''}
                      `}
                    >
                      {stage.stage}
                    </Typo>
                  </div>

                  <Typo variant="baseBold" className="mb-2">
                    {stage.title}
                  </Typo>
                  <Typo variant="muted" className="text-sm mb-4">
                    {stage.description}
                  </Typo>

                  {/* Outcome */}
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <Typo variant="sm" className="text-foreground">
                        {stage.outcome}
                      </Typo>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card className="inline-block p-6 bg-gradient-to-r from-primary/5 via-card to-info/5 border-primary/20">
            <Typo variant="lg" className="text-foreground">
              The result?{' '}
              <span className="text-primary font-bold">
                More time building what makes your product unique.
              </span>
            </Typo>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
