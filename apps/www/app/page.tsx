import { Typo } from '@repo/ui/typo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Thon Labs',
  },
};

export default function Home() {
  return <Typo>Thon Labs!</Typo>;
}
