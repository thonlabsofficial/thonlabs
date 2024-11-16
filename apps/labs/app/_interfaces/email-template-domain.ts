export enum EmailDomainStatus {
  Verifying = 'Verifying',
  Verified = 'Verified',
  Failed = 'Failed',
}

export interface EmailTemplateDomain {
  domain: string;
  status: EmailDomainStatus;
  records: {
    record: string;
    name: string;
    type: string;
    ttl: string;
    status: string;
    value: string;
    priority: number;
  }[];
  region: string;
}
