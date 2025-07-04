export enum EmailProviderTypes {
  Resend = 'resend',
  SES = 'aws_ses',
}

export interface EmailProvider {
  active: boolean;
  domain: string;
  secretKey: string;
}
