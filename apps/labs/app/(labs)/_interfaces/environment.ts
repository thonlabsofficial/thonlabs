import { Project } from './project';

export enum CustomDomainStatus {
  Verifying = 'Verifying',
  Verified = 'Verified',
  Failed = 'Failed',
}

export interface Environment {
  id: string;
  name: string;
  appURL: string;
  project: Project;
}

export interface EnvironmentDetail extends Environment {
  active: boolean;
  tokenExpiration: string;
  refreshTokenExpiration: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  publicKey: string;
  authProvider: string;
  secretKey?: string;
  customDomain?: string;
  customDomainStatus?: string;
  customDomainStartValidationAt?: Date;
  customDomainLastValidationAt?: Date;
}
