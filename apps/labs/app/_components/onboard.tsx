import OnboardIntegration, {
  OnboardIntegrationHeader,
  OnboardIntegrationOptions,
} from '@/_components/onboard-integration';
import { OnboardIntegrationProvider } from '@/_providers/onboard-integration-provider';

interface Props {
  forceNotInitialized?: boolean;
}

export default function Onboard({ forceNotInitialized }: Props) {
  return (
    <OnboardIntegrationProvider forceNotInitialized={forceNotInitialized}>
      <section className="grid grid-cols-[24rem_1fr] gap-2 mt-3">
        <div className="space-y-2">
          <OnboardIntegrationHeader />
          <OnboardIntegrationOptions />
        </div>
        <OnboardIntegration />
      </section>
    </OnboardIntegrationProvider>
  );
}
