import OnboardFinish from '@/onboard/_components/onboard-finish';
import OnboardNewProject from '@/onboard/_components/onboard-new-project';
import OnboardWelcome from '@/onboard/_components/onboard-welcome';

export enum OnboardStep {
  Welcome = 'welcome',
  CreateProject = 'create-project',
  Finish = 'finish',
}

export const onboardFlow: Record<
  OnboardStep,
  {
    title: string;
    component: React.ComponentType;
  }
> = {
  [OnboardStep.Welcome]: {
    title: 'Welcome, {userName}!',
    component: OnboardWelcome,
  },
  [OnboardStep.CreateProject]: {
    title: 'Create your first project',
    component: OnboardNewProject,
  },
  [OnboardStep.Finish]: {
    title: 'Well done, {userName}!',
    component: OnboardFinish,
  },
};
