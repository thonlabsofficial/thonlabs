import { Button } from '@/ui/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/components/ui/card';
import { Input } from '@/ui/components/ui/input';
import { Label } from '@/ui/components/ui/label';
import { Typo } from '@/ui/components/ui/typo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Login() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>Login to Thon Labs</CardDescription>
        </CardHeader>
        <form>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  inputSize="lg"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  inputSize="lg"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            {/* {error && (
              <Typo variant={'small'} className="text-red-600 font-bold">
                {error}
              </Typo>
            )} */}

            <Button size="lg" className="w-full">
              {/* {submitting && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin -mt-1" />
              )} */}
              Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
