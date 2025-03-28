import { EnvironmentData } from '@thonlabs/nextjs';
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

export interface EnvironmentDetail extends Environment, EnvironmentData {
  active: boolean;
  tokenExpiration: string;
  refreshTokenExpiration: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  publicKey: string;
  secretKey?: string;
  customDomain?: string;
  customDomainStatus?: string;
  customDomainStartValidationAt?: Date;
  customDomainLastValidationAt?: Date;
  customDomainTXT?: string;
  customDomainTXTStatus?: string;
}
