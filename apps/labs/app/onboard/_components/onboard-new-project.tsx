import { AlertDialog } from '@repo/ui/alert-dialog';
import { Card, CardContent, CardHeader } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import * as motion from 'framer-motion/client';
import Container from '@/_components/container';
import OnboardHeader from '@/onboard/_components/onboard-header';
import OnboardNewProjectForm from '@/onboard/_components/onboard-new-project-form';

export default async function OnboardNewProject() {
  return (
    <>
      <OnboardHeader />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-4 flex items-center justify-center'
      >
        <Container className='flex h-[70vh] items-center justify-center p-4'>
          <Card className='w-full max-w-96 space-y-2 overflow-hidden'>
            <CardHeader className='text-center'>
              <Typo variant='h4' className='mt-5 font-bold'>
                Create your first project
              </Typo>
              <AlertDialog
                trigger={
                  <Typo variant='sm' className='mt-2 cursor-pointer underline'>
                    What is a project?
                  </Typo>
                }
                title='What is a project?'
              >
                <article className='space-y-2'>
                  <Typo as='p' className='text-muted-foreground'>
                    A project organizes your app&apos;s authentication across
                    different environments - like development, staging, and
                    production.
                  </Typo>
                  <Typo as='p' className='text-muted-foreground'>
                    Each environment has its own users, organizations, email
                    templates, and settings, keeping everything isolated and
                    secure.
                  </Typo>
                </article>
              </AlertDialog>
            </CardHeader>
            <CardContent className='px-5 py-3 pb-5'>
              <Typo as='div' className='mb-7 text-center' variant='muted'>
                We'll start you off with a <strong>"Development"</strong>{' '}
                environment so you can begin testing right away.
              </Typo>

              <OnboardNewProjectForm />
            </CardContent>
          </Card>
        </Container>
      </motion.div>
    </>
  );
}
