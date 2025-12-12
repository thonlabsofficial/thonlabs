import { MetadataValue } from '@/_interfaces/metadata';

export interface Organization {
  id: string;
  name: string;
  logo: string;
  domains: {
    domain: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  environmentId: string;
  active: boolean;
  metadata?: MetadataValue;
}

export interface OrganizationUser {
  id: string;
  fullName: string;
  email: string;
  profilePicture: string;
  active: boolean;
}

export interface OrganizationDetail extends Organization {
  users: OrganizationUser[];
}
