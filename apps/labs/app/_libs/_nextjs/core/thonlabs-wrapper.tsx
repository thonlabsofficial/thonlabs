import { EnvironmentData } from '../interfaces/environment-data';
import { api } from '../services/api';
import { ThonLabsGeneralProvider } from './thonlabs-general-provider';
import { ThonLabsSessionProvider } from './thonlabs-session-provider';
import { ThonLabsInternalProvider } from './thonlabs-internal-provider';
import ToasterObservable from '../pages/components/toaster-observable';

/*
  This is a wrapper to get environment data from backend and forward to frontend.
  The customers needs to implement this in their app to make things work.

  Order is:
    - Wrapper
      - Session Provider
        - General Provider
*/

export interface ThonLabsWrapperProps
  extends React.HTMLAttributes<HTMLElement> {
  environmentId: string;
  publicKey: string;
}

export async function ThonLabsWrapper({
  children,
  environmentId,
  publicKey,
}: ThonLabsWrapperProps) {
  if (!environmentId) {
    throw new Error('ThonLabs Error: Environment ID is required.');
  }

  if (!publicKey) {
    throw new Error('ThonLabs Error: Public key is required.');
  }

  const environmentData = await api<EnvironmentData>(
    `/environments/${environmentId}/data`,
    {
      environmentId,
      publicKey,
    },
  );

  if (!environmentData) {
    throw new Error(
      'ThonLabs Error: Environment data is unavailable. Please verify that the public key and environment settings are correct. You can find these values under "Settings" at https://app.thonlabs.io.',
    );
  }

  return (
    <ThonLabsInternalProvider>
      <ToasterObservable />
      <ThonLabsSessionProvider
        environmentData={environmentData}
        environmentId={environmentId}
        publicKey={publicKey}
      >
        <ThonLabsGeneralProvider>{children}</ThonLabsGeneralProvider>
      </ThonLabsSessionProvider>
    </ThonLabsInternalProvider>
  );
}
