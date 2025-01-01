import { EnvironmentData } from '../../shared/interfaces/environment-data';
import { ThonLabsSessionProvider } from './thonlabs-session-provider';
import { ThonLabsInternalProvider } from './thonlabs-internal-provider';
import ToasterObservableWrapper from '../pages/components/toaster-observable-wrapper';
import { api } from '../../shared/utils/api';
import Log from '../../shared/utils/log';
import { environmentStore } from '../../shared/store/env-store';

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
  baseURL: string;
}

export async function ThonLabsWrapper({
  children,
  environmentId,
  publicKey,
  baseURL,
}: ThonLabsWrapperProps) {
  if (!environmentId) {
    Log.error({
      action: 'ThonLabsWrapper',
      message: 'ThonLabs Error: Environment ID is required.',
    });
    return null;
  }

  if (!publicKey) {
    Log.error({
      action: 'ThonLabsWrapper',
      message: 'ThonLabs Error: Public key is required.',
    });
    return null;
  }

  environmentStore.setConfig({
    environmentId,
    publicKey,
    baseURL,
  } as EnvironmentData);

  const environmentData = await api<EnvironmentData>(
    `/environments/${environmentId}/data`,
    {
      environmentId,
      publicKey,
    },
  );

  if (!environmentData) {
    Log.error({
      action: 'ThonLabsWrapper',
      message:
        'ThonLabs Error: Environment data is unavailable. Please verify that the public key and environment settings are correct. You can find these values under "Settings" at https://app.thonlabs.io.',
    });
    return null;
  }

  return (
    <ThonLabsInternalProvider>
      <ToasterObservableWrapper />
      <ThonLabsSessionProvider
        environmentData={environmentData as EnvironmentData}
        environmentId={environmentId}
        publicKey={publicKey}
      >
        {children}
      </ThonLabsSessionProvider>
    </ThonLabsInternalProvider>
  );
}
