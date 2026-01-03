import LandingGrid from '@repo/ui/landing-grid';
import { Metadata } from 'next';
import {
  HeroSection,
  ProblemSection,
  ValueStackSection,
  SocialProofSection,
  TransformationSection,
  CtaSection,
  FooterSection,
} from './_components/sections';

export const metadata: Metadata = {
  title: {
    absolute: 'ThonLabs · The Open Source Auth Platform for SaaS',
  },
  description:
    'Stop building auth. Start shipping products. ThonLabs is the open-source platform with plug-and-play authentication, user management, and organizations for your SaaS.',
  openGraph: {
    title: 'ThonLabs · The Open Source Auth Platform for SaaS',
    description:
      'Stop building auth. Start shipping products. Plug-and-play authentication, user management, and organizations for your SaaS.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThonLabs · The Open Source Auth Platform for SaaS',
    description:
      'Stop building auth. Start shipping products. Plug-and-play authentication, user management, and organizations for your SaaS.',
  },
};

export default function Home() {
  return (
    <>
      <LandingGrid />

      {/* 1. HERO: Capture email or make user scroll */}
      <HeroSection />

      {/* 2. PROBLEM → AGITATE: Make status quo painful */}
      <ProblemSection />

      {/* 3. VALUE STACK: Make not buying feel stupid */}
      <ValueStackSection />

      {/* 4. SOCIAL PROOF: Let others convince them */}
      <SocialProofSection />

      {/* 5. TRANSFORMATION: Make outcome tangible */}
      <TransformationSection />

      {/* 6. SECONDARY CTA: Catch late scrollers */}
      <CtaSection />

      {/* 7. FOOTER: Add legitimacy */}
      <FooterSection />
    </>
  );
}
