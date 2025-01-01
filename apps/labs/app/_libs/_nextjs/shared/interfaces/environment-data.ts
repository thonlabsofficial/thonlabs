export enum AuthProviders {
  MagicLogin = 'MagicLogin',
  EmailAndPassword = 'EmailAndPassword',
}

export interface EnvironmentData {
  environmentId: string;
  publicKey: string;
  baseURL?: string;
  authProvider: AuthProviders;
  enableSignUp: boolean;
  enableSignUpB2BOnly: boolean;
  projectId: string;
  appName: string;
}
