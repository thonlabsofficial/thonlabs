import { Badge } from '@repo/ui/badge';
import { Button, buttonVariants } from '@repo/ui/button';
import LandingGrid from '@repo/ui/landing-grid';
import { Typo } from '@repo/ui/typo';
import { Metadata } from 'next';
import { SiGithub } from 'react-icons/si';
import * as motion from 'framer-motion/client';
import JoinWaitlistButton from './_components/join-waitlist-button';
import { BentoGrid, BentoGridItem } from '@repo/ui/bento-grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card';
import { 
  Zap, 
  Shield, 
  Code2, 
  Users, 
  Sparkles,
  Github,
  ChevronDown
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
      <section className="p-4 mt-14 lg:mt-24 mb-20 lg:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-4"
        >
          <Badge size={'lg'}>Currently Building In Public</Badge>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-4 lg:gap-2 text-center mx-auto max-w-3xl mb-7 lg:mb-4"
        >
          <Typo variant={'h1'} className="lg:leading-tight">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Typo>
          <Typo variant={'lead'}>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Typo>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <JoinWaitlistButton />
          <a
            href="https://git.new/thonlabs?utm_source=website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" icon={SiGithub}>
              Star on GitHub
            </Button>
          </a>
        </motion.div>

        {/* App Screenshot Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative rounded-lg border border-border bg-gradient-to-br from-muted/50 to-muted overflow-hidden shadow-2xl">
            <div className="aspect-video flex items-center justify-center p-12">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <Typo variant="muted" className="text-lg">
                  App Screenshot Placeholder
                </Typo>
              </div>
            </div>
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 lg:py-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <Typo variant="h2" className="mb-4">
            Lorem ipsum dolor sit amet
          </Typo>
          <Typo variant="lead" className="max-w-2xl mx-auto">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typo>
        </motion.div>

        <BentoGrid>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <BentoGridItem
              title="Quis nostrud exercitation"
              description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              icon={Zap}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BentoGridItem
              title="Duis aute irure dolor"
              description="In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              icon={Shield}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BentoGridItem
              title="Excepteur sint occaecat"
              description="Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              icon={Code2}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <BentoGridItem
              title="Sed do eiusmod tempor"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
              icon={Users}
            />
          </motion.div>
        </BentoGrid>
      </section>

      {/* Impact/Quote Section */}
      <section className="px-4 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <Typo variant="h2" className="text-primary">
                      G
                    </Typo>
                  </div>
                </div>
                <div className="space-y-4">
                  <Typo variant="h3" className="italic leading-relaxed">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                  </Typo>
                  <div>
                    <Typo variant="baseBold">Gus</Typo>
                    <Typo variant="muted">Founder & Creator</Typo>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 lg:py-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Typo variant="h2" className="mb-4">
            Frequently Asked Questions
          </Typo>
          <Typo variant="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typo>
        </motion.div>

        <div className="space-y-4">
          {[
            {
              question: 'Lorem ipsum dolor sit amet?',
              answer: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
            },
            {
              question: 'Quis nostrud exercitation ullamco?',
              answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'
            },
            {
              question: 'Sed do eiusmod tempor incididunt?',
              answer: 'Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            },
            {
              question: 'Excepteur sint occaecat cupidatat?',
              answer: 'Sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:border-primary/40 transition-colors">
                <CardHeader padding>
                  <CardTitle className="flex items-center justify-between">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <Typo variant="muted">{faq.answer}</Typo>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Source CTA */}
      <section className="px-4 py-16 lg:py-24 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-foreground to-foreground/80 border-foreground text-background overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/5" />
            <CardContent className="p-8 lg:p-12 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Github className="w-8 h-8" />
                    <Badge 
                      className="bg-background/20 text-background border-background/30"
                    >
                      Open Source
                    </Badge>
                  </div>
                  <Typo variant="h2" className="mb-3 text-background">
                    Lorem ipsum dolor sit amet
                  </Typo>
                  <Typo className="text-background/80 text-lg">
                    Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. 
                    Duis aute irure dolor in reprehenderit in voluptate velit.
                  </Typo>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://git.new/thonlabs?utm_source=website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="opposite" 
                      size="lg" 
                      icon={Github}
                      className="bg-background text-foreground hover:bg-background/90"
                    >
                      View on GitHub
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </>
  );
}
