import { Typo } from '@/ui/components/ui/typo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thon Labs | The Foundation For Your SaaS',
  description:
    'Build your SaaS on a secure foundation for authentication, custom emails and environments. Have focus on what matters: your product and client. Start For Free.',
};

export default function Home() {
  return (
    <Typo variant={'h1'} className="text-primary">
      Thon Labs!
    </Typo>
  );
}
