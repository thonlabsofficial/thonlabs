import { Button, buttonVariants } from '@/ui/components/ui/button';
import { Input, InputWrapper } from '@/ui/components/ui/input';
import { Label, labelVariants } from '@/ui/components/ui/label';
import { Typo } from '@/ui/components/ui/typo';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Login() {
  return (
    <div className="flex md:items-center justify-center">
      <div className="mt-16 sm:pt-0 md:mt-40 px-3 w-full sm:max-w-[400px]">
        <header className="flex flex-col gap-2 mb-14">
          <Typo variant={'h2'}>Welcome</Typo>
          <Typo variant={'small'} className="!text-zinc-400">
            Log in to Thon Labs
          </Typo>
        </header>
        <form>
          <div className="grid w-full items-center gap-5">
            <InputWrapper>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="you@example.com"
                inputSize="lg"
                required
              />
            </InputWrapper>

            <InputWrapper>
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  className={`text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 
                    transition-all duration-200 ease-in-out 
                    text-sm font-medium leading-none hover:underline`}
                  href="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                inputSize="lg"
                required
              />
            </InputWrapper>
          </div>
          {/* {error && (
              <Typo variant={'small'} className="text-red-600 font-bold">
                {error}
              </Typo>
            )} */}

          <Button size="lg" className="w-full mt-8">
            {/* {submitting && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin -mt-1" />
              )} */}
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
