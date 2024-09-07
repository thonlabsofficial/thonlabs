import { EnvironmentData } from './interfaces/environment-data';
import { ThonLabsGeneralProvider } from './thonlabs-general-provider';
import { ThonLabsSessionProvider } from './thonlabs-session-provider';

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

  const environmentData = await fetch(
    `${
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_TL_API
        : 'https://api.thonlabs.io'
    }/environments/${environmentId}/data`,
    {
      headers: {
        'tl-env-id': environmentId,
        'tl-public-key': publicKey,
      },
    },
  ).then((res) => res.json() as Promise<EnvironmentData>);

  if (!environmentData) {
    throw new Error(
      'ThonLabs Error: Environment data is unavailable. Please verify that the public key and environment settings are correct. You can find these values under "Settings" at https://app.thonlabs.io.',
    );
  }

  return (
    <ThonLabsSessionProvider environmentData={environmentData}>
      <ThonLabsGeneralProvider>{children}</ThonLabsGeneralProvider>
    </ThonLabsSessionProvider>
  );
}
