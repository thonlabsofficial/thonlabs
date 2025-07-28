import { buttonVariants } from '@repo/ui/button';
import { Card, CardContent, CardHeader } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import * as motion from 'framer-motion/client';
import Link from 'next/link';
import Container from '@/_components/container';
import Logo from '@/_components/logo';
import { getAuthSession } from '@/_services/server-auth-session-service';

export default async function OnboardWelcome() {
  const session = await getAuthSession();

  return (
    <Container className='flex h-[80vh] items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-4 flex items-center justify-center'
      >
        <Card className='w-full max-w-96 space-y-2 overflow-hidden text-center'>
          <CardHeader>
            <div className='flex h-28 items-center justify-center bg-background'>
              <Logo />
            </div>
            <Typo variant='h4' className='mt-5 font-bold'>
              Welcome, {session?.user?.fullName?.split(' ')[0]}!
            </Typo>
          </CardHeader>
          <CardContent className='px-5 py-3 pb-5'>
            <Typo as='div' className='mb-7' variant='muted'>
              Thanks for signing up – you now have a streamlined space to manage
              and take control of your app&apos;s authentication.
            </Typo>

            <Link
              href='/onboard/create-project'
              className={buttonVariants({ className: 'w-full' })}
            >
              Get Started
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}
