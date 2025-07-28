import { Badge } from '@repo/ui/badge';
import { buttonVariants } from '@repo/ui/button';
import LandingGrid from '@repo/ui/landing-grid';
import { Typo } from '@repo/ui/typo';
import * as motion from 'framer-motion/client';
import type { Metadata } from 'next';
import { SiGithub } from 'react-icons/si';
import JoinWaitlistButton from './_components/join-waitlist-button';

export const metadata: Metadata = {
  title: {
    absolute: 'ThonLabs · Easy Setup Authentication for your SaaS',
  },
};

export default function Home() {
  return (
    <>
      <LandingGrid />
      <div className='mt-14 p-4 lg:mt-24'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-4 flex items-center justify-center'
        >
          <Badge size={'lg'}>Currently Building In Public</Badge>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mx-auto mb-7 flex max-w-3xl flex-col gap-4 text-center lg:mb-4 lg:gap-2'
        >
          <Typo variant={'h1'} className='lg:leading-tight'>
            The open source platform built to scale with your SaaS product.
          </Typo>
          <Typo variant={'lead'}>
            Set up secure login and user management in minutes. ThonLabs has no
            complex setup, just seamless integration to get your web app ready
            fast.
          </Typo>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='flex items-center justify-center'
        >
          <JoinWaitlistButton />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className='mx-auto my-8 h-px w-20 bg-border' />
          <div className='flex items-center justify-center gap-3'>
            <a
              href='https://git.new/thonlabs?utm_source=website'
              target='_blank'
              rel='noopener noreferrer'
              className={buttonVariants({
                variant: 'linkGhost',
                className: 'flex items-center gap-1.5',
                size: 'sm',
              })}
            >
              <SiGithub /> Star us on GitHub
            </a>

            {/* <a
              href="https://dub.sh/x-guscsales"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: 'linkGhost',
                className: 'flex items-center gap-1.5',
                size: 'sm',
              })}
            >
              <SiX /> Follow the builder
            </a> */}
          </div>
        </motion.div>
      </div>
    </>
  );
}
