import { Badge } from '@repo/ui/badge';
import { Button } from '@repo/ui/button';
import LandingGrid from '@repo/ui/landing-grid';
import { Metadata } from 'next';
import { SiGithub } from 'react-icons/si';
import * as motion from 'framer-motion/client';
import FeaturesSection from './_components/features-section';
import FeatureShowcase from './_components/feature-showcase';
import HeroCodeBlock from './_components/hero-code-block';
import { Card, CardContent } from '@repo/ui/card';
import {
  ArrowRight,
  Star,
  Terminal,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: {
    absolute: 'ThonLabs · Easy Setup Authentication for your SaaS',
  },
};

export default function Home() {
  return (
    <>
      <LandingGrid />

      {/* Hero Section */}
      <section className="relative px-4 pt-20 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        {/* White/neutral glow like Midday & Linear */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.03] rounded-full blur-[120px] -z-10" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px] -z-10" />
        <div className="absolute top-60 right-1/4 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-[80px] -z-10" />

        <div className="max-w-6xl mx-auto">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-8"
          >
            <a
              href="https://git.new/thonlabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge
                size="lg"
                className="gap-2 bg-white/5 text-foreground/80 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Star className="w-3.5 h-3.5" />
                Open Source & Self-Hostable
                <ArrowRight className="w-3 h-3 ml-1" />
              </Badge>
            </a>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-foreground">The foundation for</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-violet-400 to-primary bg-clip-text text-transparent">
                Next.js Apps
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-10"
          >
            Stop building auth from scratch. Get email, social logins, MFA, and
            user management in minutes. Built for developers who ship fast.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a href="https://labs.thonlabs.io/auth/sign-up">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a
              href="https://git.new/thonlabs?utm_source=website"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" icon={SiGithub}>
                Star on GitHub
              </Button>
            </a>
          </motion.div>

          {/* Code Block */}
          <HeroCodeBlock />
        </div>
      </section>

      {/* Install command banner */}
      <section className="px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm">
            <Terminal className="w-4 h-4 text-muted-foreground" />
            <code className="text-sm font-mono text-muted-foreground">
              npm install @thonlabs/nextjs
            </code>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-sm text-muted-foreground">
              Ready in 5 minutes
            </span>
          </div>
        </motion.div>
      </section>

      {/* Quick Features Grid */}
      <section className="px-4 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <Badge className="mb-4">Features</Badge>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl mb-4">
              Everything you need.
              <br />
              <span className="text-muted-foreground">Nothing you don't.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              A complete authentication solution without the complexity. Focus
              on your product, not infrastructure.
            </p>
          </motion.div>

          <FeaturesSection />
        </div>
      </section>

      {/* Feature Showcase with Images */}
      <FeatureShowcase />

      {/* Why ThonLabs Section */}
      <section className="px-4 py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent -z-10" />

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-16"
          >
            <Badge className="mb-4">Why ThonLabs</Badge>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl mb-4">
              Built different
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Unlike other solutions, ThonLabs is designed to be simple,
              self-hostable, and actually enjoyable to use.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Open Source',
                description:
                  'Full transparency. Audit the code, contribute, or self-host. Your data, your rules.',
                delay: 0,
              },
              {
                title: 'Developer First',
                description:
                  'TypeScript native with excellent DX. Clean APIs, great docs, and real examples.',
                delay: 0.1,
              },
              {
                title: 'Production Ready',
                description:
                  'Battle-tested security practices. Rate limiting, audit logs, and compliance built-in.',
                delay: 0.2,
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
              >
                <Card className="h-full border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Quote/Testimonial */}
      <section className="px-4 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-8"
          >
            Built by developers, for developers.
          </motion.p>

          {/* Quote and Author */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16 mb-16">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl font-semibold leading-tight max-w-2xl"
            >
              "I was tired of spending weeks on authentication instead of
              building my actual product. Now I ship auth in an afternoon."
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="font-semibold">Gus Sales</div>
              <div className="text-sm text-muted-foreground mb-2">
                Creator & Founder
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">T</span>
                </div>
                ThonLabs
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                value: '5',
                unit: 'min',
                label: 'Setup time for',
                highlight: 'full authentication',
              },
              {
                value: '10',
                unit: 'x',
                label: 'Faster than',
                highlight: 'building from scratch',
              },
              {
                value: '100',
                unit: '%',
                label: 'Open source with',
                highlight: 'full transparency',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-xl border border-border/50 bg-card/30"
              >
                <div className="text-5xl lg:text-6xl font-bold mb-3">
                  {stat.value}
                  <span className="text-muted-foreground text-3xl lg:text-4xl">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}{' '}
                  <span className="font-medium text-foreground">
                    {stat.highlight}
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="px-4 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
              }}
            />

            {/* Glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] bg-violet-500/10 rounded-full blur-[80px]" />

            {/* Content */}
            <div className="relative p-10 lg:p-20 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-white/70">
                    Start building today
                  </span>
                </div>

                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Ready to ship
                  <br />
                  <span className="bg-gradient-to-r from-primary via-violet-400 to-primary bg-clip-text text-transparent">
                    faster?
                  </span>
                </h2>

                <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
                  Join developers who have stopped reinventing the auth wheel.
                  Start building what matters.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="https://labs.thonlabs.io/auth/sign-up">
                    <Button size="lg" className="gap-2">
                      Get Started Free
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                  <a
                    href="https://git.new/thonlabs?utm_source=website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <SiGithub className="w-4 h-4 mr-2" />
                      View on GitHub
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
