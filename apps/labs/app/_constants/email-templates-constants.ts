import { EmailTemplateTypes } from '@/_interfaces/email-template';
import { SiResend } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { EmailProviderTypes } from '@/_interfaces/email-provider';

interface EmailTemplatesConstants {
  allowedStatusChange: EmailTemplateTypes[];
  emailProviders: Record<
    EmailProviderTypes,
    {
      name: string;
      icon: any;
      soon?: boolean;
    }
  >;
}

const emailTemplatesConstants: EmailTemplatesConstants = {
  allowedStatusChange: [EmailTemplateTypes.Welcome],
  emailProviders: {
    [EmailProviderTypes.Resend]: {
      name: 'Resend',
      icon: SiResend,
    },
    [EmailProviderTypes.SES]: {
      name: 'AWS SES',
      icon: FaAws,
      soon: true,
    },
  },
};

export default emailTemplatesConstants;
