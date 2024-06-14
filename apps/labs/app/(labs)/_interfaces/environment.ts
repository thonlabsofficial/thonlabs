import { Project } from './project';

export interface Environment {
  id: string;
  name: string;
  appURL: string;
  project: Project;
}
