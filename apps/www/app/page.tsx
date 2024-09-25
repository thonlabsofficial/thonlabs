import { Badge } from '@repo/ui/badge';
import { Button, buttonVariants } from '@repo/ui/button';
import LandingGrid from '@repo/ui/landing-grid';
import { Typo } from '@repo/ui/typo';
import { Metadata } from 'next';
import { SiGithub } from 'react-icons/si';

export const metadata: Metadata = {
  title: {
    absolute: 'ThonLabs · Easy Setup Authentication for your SaaS',
  },
};

export default function Home() {
  return (
    <>
      <LandingGrid />
      <div className="p-4 mt-14 lg:mt-24">
        <div className="flex items-center justify-center mb-4">
          <Badge size={'lg'}>Currently Building In Public</Badge>
        </div>
        <div className="flex flex-col gap-4 lg:gap-2 text-center mx-auto max-w-3xl mb-7 lg:mb-4">
          <Typo variant={'h1'} className="lg:leading-tight">
            The open source platform built to scale with your SaaS product.
          </Typo>
          <Typo variant={'lead'}>
            Set up secure login and user management in minutes. ThonLabs has no
            complex setup, just seamless integration to get your web app ready
            fast.
          </Typo>
        </div>
        <div className="flex items-center justify-center">
          <Button
            className="group hidden lg:flex"
            variant={'linkGhost'}
            size={'sm'}
          >
            Press{' '}
            <Button size={'xs'} variant={'outline'}>
              W
            </Button>{' '}
            to join waitlist
          </Button>
          <Button className="group flex lg:hidden" size={'lg'}>
            Join Waitlist
          </Button>
        </div>
        <div className="mx-auto w-20 h-px bg-border my-8" />
        <div className="flex gap-3 items-center justify-center">
          <a
            href="https://git.new/thonlabs"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: 'linkGhost',
              className: 'flex items-center gap-1.5',
              size: 'sm',
            })}
          >
            <SiGithub /> Star us on GitHub
          </a>
        </div>
      </div>
    </>
  );
}
