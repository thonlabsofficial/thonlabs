import React from 'react';
import Logo from '@repo/ui/logo';
import { Button } from '@repo/ui/button';
import { SiGithub, SiX } from 'react-icons/si';

const footerLinks = {
  features: [
    { label: 'Authentication', href: '#features' },
    { label: 'Organizations', href: '#features' },
    { label: 'Email Templates', href: '#features' },
    { label: 'User Management', href: '#features' },
    { label: 'Metadata', href: '#features' },
  ],
  product: [
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '/changelog' },
    {
      label: 'Documentation',
      href: 'https://docs.thonlabs.io',
      external: true,
    },
    {
      label: 'API Reference',
      href: 'https://docs.thonlabs.io/api',
      external: true,
    },
  ],
  resources: [
    { label: 'GitHub', href: 'https://git.new/thonlabs', external: true },
    { label: 'Community', href: 'https://discord.gg/thonlabs', external: true },
    { label: 'Status', href: 'https://status.thonlabs.io', external: true },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
  connect: [
    { label: 'X (Twitter)', href: 'https://x.com/thonlabs', external: true },
    { label: 'GitHub', href: 'https://git.new/thonlabs', external: true },
    { label: 'Discord', href: 'https://discord.gg/thonlabs', external: true },
  ],
};

export default function MainFooter() {
  return (
    <footer className="border-t border-border/50">
      {/* Pre-footer CTA */}
      <div className="border-b border-border/50">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">
              Own your auth.
              <br />
              <span className="text-muted-foreground">Ship faster.</span>
            </h2>
            <div className="flex items-center gap-3">
              <a href="https://docs.thonlabs.io">
                <Button variant="outline" size="md">
                  Read docs
                </Button>
              </a>
              <a href="https://labs.thonlabs.io/auth/sign-up">
                <Button size="md">Get started</Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <Logo forceTheme="dark" />
          </div>

          {/* Features */}
          <div>
            <h3 className="font-medium text-sm mb-4">Features</h3>
            <ul className="space-y-3">
              {footerLinks.features.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-medium text-sm mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium text-sm mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-sm mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-medium text-sm mb-4">Connect</h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar with social icons */}
        <div className="mt-12 pt-8 border-t border-border/50 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ThonLabs
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/thonlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiX className="w-4 h-4" />
            </a>
            <a
              href="https://git.new/thonlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiGithub className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
