export enum EmailTemplateTypes {
  Welcome = 'Welcome',
  MagicLink = 'MagicLink',
  ConfirmEmail = 'ConfirmEmail',
  ForgotPassword = 'ForgotPassword',
  Invite = 'Invite',
}

export interface EmailTemplate {
  id: string;
  name: string;
  type: EmailTemplateTypes;
  subject: string;
  fromName: string;
  fromEmail: string;
  content: string;
  contentJSON: object;
  preview?: string;
  replyTo?: string;
  enabled?: boolean;
  updatedAt?: Date;
  environmentId?: string;
  bodyStyles?: {
    backgroundColor?: string;
    color?: string;
    padding?: number;
  };
}
