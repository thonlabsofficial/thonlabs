import { notFound } from 'next/navigation';
import { getAuthSession } from '@/_services/server-auth-session-service';
import { OnboardStep, onboardFlow } from '../_constants/onboard-flow';

type Params = Promise<{ step: OnboardStep }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { step } = await params;
  const onboardStep = onboardFlow[step as OnboardStep];
  let title = onboardStep.title;

  if ([OnboardStep.Welcome, OnboardStep.Finish].includes(step)) {
    const session = await getAuthSession();
    title = title.replace(
      '{userName}',
      session?.user?.fullName?.split(' ')[0] || ''
    );
  }

  return {
    title,
  };
}

export default async function OnboardPage({ params }: { params: Params }) {
  const { step } = await params;

  const onboardStep = onboardFlow[step as OnboardStep];

  if (!onboardStep) {
    return notFound();
  }

  const Component = onboardStep.component;

  return <Component />;
}
