'use client';

import Logo from '@repo/ui/logo';
import { Separator } from '@repo/ui/separator';
import { Typo } from '@repo/ui/typo';
import * as motion from 'framer-motion/client';
import { SiGithub, SiX } from 'react-icons/si';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
    { label: 'Changelog', href: '#changelog' },
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
  ],
  legal: [
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Security', href: '#security' },
  ],
};

const socialLinks = [
  {
    icon: SiGithub,
    href: 'https://git.new/thonlabs',
    label: 'GitHub',
  },
  {
    icon: SiX,
    href: 'https://dub.sh/x-thonlabs',
    label: 'X (Twitter)',
  },
];

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t bg-card/50">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Main footer content */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand column */}
            <div className="col-span-2">
              <Logo className="mb-4" />
              <Typo variant="muted" className="mb-6 max-w-xs">
                The open-source auth platform that gives your SaaS the
                foundation it needs. Ship faster, scale easier.
              </Typo>

              {/* Social links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product links */}
            <div>
              <Typo variant="baseBold" className="mb-4">
                Product
              </Typo>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <Typo variant="baseBold" className="mb-4">
                Company
              </Typo>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <Typo variant="baseBold" className="mb-4">
                Legal
              </Typo>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Typo variant="mutedXs">
              © {currentYear} ThonLabs. All rights reserved.
            </Typo>

            <div className="flex items-center gap-6">
              <Typo variant="mutedXs" className="flex items-center gap-1">
                Made with{' '}
                <span className="text-destructive">❤</span> for developers
              </Typo>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
