import Container from '@/_components/container';
import { getAuthSession } from '@/_services/server-auth-session-service';
import { Typo } from '@repo/ui/typo';
import { Card, CardContent, CardHeader } from '@repo/ui/card';
import Link from 'next/link';
import { buttonVariants } from '@repo/ui/button';
import Logo from '@/_components/logo';
import * as motion from 'framer-motion/client';

export default async function OnboardWelcome() {
  const session = await getAuthSession();

  return (
    <Container className="flex items-center justify-center p-4 h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-4"
      >
        <Card className="space-y-2 text-center w-full max-w-96 overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-center bg-background h-28">
              <Logo />
            </div>
            <Typo variant="h4" className="font-bold mt-5">
              Welcome, {session?.user?.fullName?.split(' ')[0]}!
            </Typo>
          </CardHeader>
          <CardContent className="px-5 pb-5 py-3">
            <Typo as="div" className="mb-7" variant="muted">
              Thanks for signing up – you now have a streamlined space to manage
              and take control of your app&apos;s authentication.
            </Typo>

            <Link
              href="/onboard/create-project"
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
