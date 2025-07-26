import Container from '@/_components/container';
import { getAuthSession } from '@/_services/server-auth-session-service';
import { Typo } from '@repo/ui/typo';
import { Card, CardContent, CardHeader } from '@repo/ui/card';
import Link from 'next/link';
import { buttonVariants } from '@repo/ui/button';
import * as motion from 'framer-motion/client';
import { Check } from 'lucide-react';
import { fetchProjects } from '@/_services/project-service';

export default async function OnboardFinish() {
  const [session, projects] = await Promise.all([
    getAuthSession(),
    fetchProjects(),
  ]);

  return (
    <Container className="flex items-center justify-center p-4 h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-4"
      >
        <Card className="space-y-2 text-center w-full max-w-96 overflow-hidden">
          <CardHeader className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-md bg-success/50 border-success flex items-center justify-center border mt-6">
              <Check className="w-8 h-8" />
            </div>
            <Typo variant="h4" className="font-bold mt-5">
              Well done, {session.user?.fullName.split(' ')[0]}!
            </Typo>
          </CardHeader>
          <CardContent className="px-5 pb-5 py-3">
            <Typo as="div" className="mb-7" variant="muted">
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
