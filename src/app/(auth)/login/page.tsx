import { Typo } from '@/ui/components/typo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Home() {
  return (
    <Typo variant={'h1'} className="text-primary">
      Login - Thon Labs!
    </Typo>
  );
}
