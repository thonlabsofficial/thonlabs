import { Organization } from './organization';
import { MetadataValue } from './metadata';

export interface User {
  id: string;
  fullName: string;
  email: string;
  active: boolean;
  emailConfirmed: boolean;
  createdAt: Date;
  lastSignIn: Date;
  updatedAt: Date;
  profilePicture?: string;
  invitedAt?: Date;
  environmentId: string;
  organization?: Organization;
  metadata?: MetadataValue;
}
