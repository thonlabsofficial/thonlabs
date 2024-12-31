import { EnvironmentData } from '@/_libs/_nextjs/v14';
import { EmailTemplateDomain } from '@/_interfaces/email-template-domain';

export interface EnvironmentAppData extends EnvironmentData {
  emailTemplateDomain: EmailTemplateDomain;
}
