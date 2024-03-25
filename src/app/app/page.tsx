import { Typo } from '@/ui/components/typo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thon Labs',
};

export default function Home() {
  return (
    <Typo variant={'h1'} className="text-primary">
      Portal - Thon Labs!
    </Typo>
  );
}
