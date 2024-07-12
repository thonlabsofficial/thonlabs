import { Project } from './project';

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
}
