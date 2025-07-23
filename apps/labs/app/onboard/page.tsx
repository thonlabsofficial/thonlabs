import { Metadata } from 'next';
import Container from '@/_components/container';

export const metadata: Metadata = {
  title: 'Welcome to ThonLabs',
};

export default function OnboardPage() {
  return (
    <>
      <Container className="p-4">Onboard page</Container>
    </>
  );
}
