import { EnvironmentData } from '@thonlabs/nextjs';

export interface EnvironmentAppData extends EnvironmentData {
  environmentName: string;
  publicKey: string;
  authDomain: string;
  environmentLogo: string;
}
