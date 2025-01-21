import { EnvironmentData } from '@thonlabs/nextjs';
import { EmailTemplateDomain } from '@/_interfaces/email-template-domain';

export interface EnvironmentAppData extends EnvironmentData {
  emailTemplateDomain: EmailTemplateDomain;
}
