'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar';
import { Card } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import * as motion from 'framer-motion/client';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO at DevFlow',
    avatar: '/avatars/sarah.jpg',
    initials: 'SC',
    quote:
      "We went from zero to auth in 15 minutes. What would have taken us 3 weeks was done before our morning standup. ThonLabs is exactly what we needed.",
    result: 'Launched 3 weeks faster',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Founder at TeamSync',
    avatar: '/avatars/marcus.jpg',
    initials: 'MR',
    quote:
      "Auth0 was costing us $400/month and still didn't have organization support without enterprise. ThonLabs gave us everything for free. The ROI is infinite.",
    result: 'Saved $4,800/year',
    rating: 5,
  },
  {
    name: 'Emily Park',
    role: 'Lead Engineer at DataVault',
    avatar: '/avatars/emily.jpg',
    initials: 'EP',
    quote:
      "Finally, an auth solution that's open source AND doesn't feel like a compromise. The developer experience is incredible. It just works.",
    result: '100% feature parity',
    rating: 5,
  },
];

const companies = [
  { name: 'DevFlow', logo: '🚀' },
  { name: 'TeamSync', logo: '🔄' },
  { name: 'DataVault', logo: '🔒' },
  { name: 'CloudPeak', logo: '☁️' },
  { name: 'BuildFast', logo: '⚡' },
];

export default function SocialProofSection() {
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
            Loved by Builders{' '}
            <span className="text-primary">Like You</span>
          </Typo>
          <Typo variant="lead" className="max-w-2xl mx-auto">
            Join hundreds of developers who've stopped reinventing auth and
            started shipping products.
          </Typo>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-shadow relative">
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Quote */}
                <Typo className="mb-6 text-muted-foreground leading-relaxed">
                  "{testimonial.quote}"
                </Typo>

                {/* Result badge */}
                <div className="mb-6 inline-block px-3 py-1 rounded-full bg-success/10 border border-success/20">
                  <Typo variant="sm" className="text-success font-semibold">
                    ✓ {testimonial.result}
                  </Typo>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Avatar size="sm">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Typo variant="sm" className="font-semibold">
                      {testimonial.name}
                    </Typo>
                    <Typo variant="mutedXs">{testimonial.role}</Typo>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Company logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Typo variant="muted" className="mb-6">
            Trusted by innovative teams
          </Typo>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-2xl">{company.logo}</span>
                <span className="font-medium">{company.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
