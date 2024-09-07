export enum AuthProviders {
  MagicLogin = 'MagicLogin',
  EmailAndPassword = 'EmailAndPassword',
}

export interface EnvironmentData {
  authProvider: AuthProviders;
}
