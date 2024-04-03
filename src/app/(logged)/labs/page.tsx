import { labsAPI } from '@/helpers/api';
import { Typo } from '@/ui/components/ui/typo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Thon Labs',
  },
};

export default function Home() {
  return (
    <Typo variant={'h1'} className="text-primary">
      Portal - Thon Labs!
    </Typo>
  );
}
