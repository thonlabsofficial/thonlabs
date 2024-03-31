import { Typo } from '@/ui/components/ui/typo';
import { Metadata } from 'next';
import styles from './_styles/login-page.module.scss';
import { cn } from '@/ui/utils';
import LoginForm from '@/app/auth/_components/login-form';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Login() {
  return (
    <div className="flex md:items-center justify-center">
      <div
        className={cn(
          'absolute inset-0 z-[-1] [mask-image:radial-gradient(closest-side,white,transparent)]',
          styles.landingGrid
        )}
      ></div>
      <div className="mt-16 sm:pt-0 md:mt-40 px-3 w-full sm:max-w-[400px]">
        <header className="flex flex-col gap-2 mb-14">
          <Typo variant={'h2'}>Welcome</Typo>
          <Typo variant={'small'} className="!text-zinc-400">
            Log in to Thon Labs
          </Typo>
        </header>
        <LoginForm />
      </div>
    </div>
  );
}
