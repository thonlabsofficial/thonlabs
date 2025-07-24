import Container from '@/_components/container';
import { Typo } from '@repo/ui/typo';
import { Card, CardContent, CardHeader } from '@repo/ui/card';
import OnboardHeader from '@/onboard/_components/onboard-header';
import { AlertDialog } from '@repo/ui/alert-dialog';
import OnboardNewProjectForm from '@/onboard/_components/onboard-new-project-form';
import * as motion from 'framer-motion/client';

export default async function OnboardNewProject() {
  return (
    <>
      <OnboardHeader />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-4"
      >
        <Container className="flex items-center justify-center p-4 h-[70vh]">
          <Card className="space-y-2 w-full max-w-96 overflow-hidden">
            <CardHeader className="text-center">
              <Typo variant="h4" className="font-bold mt-5">
                Create your first project
              </Typo>
              <AlertDialog
                trigger={
                  <Typo variant="sm" className="mt-2 underline cursor-pointer">
                    What is a project?
                  </Typo>
                }
                title="What is a project?"
              >
                <article className="space-y-2">
                  <Typo as="p" className="text-muted-foreground">
                    A project organizes your app&apos;s authentication across
                    different environments - like development, staging, and
                    production.
                  </Typo>
                  <Typo as="p" className="text-muted-foreground">
                    Each environment has its own users, organizations, email
                    templates, and settings, keeping everything isolated and
                    secure.
                  </Typo>
                </article>
              </AlertDialog>
            </CardHeader>
            <CardContent className="px-5 pb-5 py-3">
              <Typo as="div" className="mb-7 text-center" variant="muted">
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
