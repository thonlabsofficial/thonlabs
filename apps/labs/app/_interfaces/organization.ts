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
}
