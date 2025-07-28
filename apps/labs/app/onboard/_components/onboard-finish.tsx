import { buttonVariants } from '@repo/ui/button';
import { Card, CardContent, CardHeader } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import * as motion from 'framer-motion/client';
import { Check } from 'lucide-react';
import Link from 'next/link';
import Container from '@/_components/container';
import { fetchProjects } from '@/_services/project-service';
import { getAuthSession } from '@/_services/server-auth-session-service';

export default async function OnboardFinish() {
  const [session, projects] = await Promise.all([
    getAuthSession(),
    fetchProjects(),
  ]);

  return (
    <Container className='flex h-[80vh] items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-4 flex items-center justify-center'
      >
        <Card className='w-full max-w-96 space-y-2 overflow-hidden text-center'>
          <CardHeader className='flex flex-col items-center'>
            <div className='mt-6 flex h-12 w-12 items-center justify-center rounded-md border border-success bg-success/50'>
              <Check className='h-8 w-8' />
            </div>
            <Typo variant='h4' className='mt-5 font-bold'>
              Well done, {session.user?.fullName.split(' ')[0]}!
            </Typo>
          </CardHeader>
          <CardContent className='px-5 py-3 pb-5'>
            <Typo as='div' className='mb-7' variant='muted'>
              You can now integrate your app and start using ThonLabs to manage
              authentication, organizations and more.
            </Typo>

            <Link
              href={`/${projects?.[0]?.environments?.[0]?.id}/dashboard`}
              className={buttonVariants({ className: 'w-full' })}
            >
              Go to dashboard
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}
