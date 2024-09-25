import { z } from 'zod';
import { CompetitorsAuthProviders } from '@/_constants/competitors-auth-providers';

export const joinWaitlistFormSchema = z.object({
  fullName: z.string().min(1, { message: 'This field is required' }),
  email: z.string().email({ message: 'This field is required' }),
  currentProvider: z.nativeEnum(CompetitorsAuthProviders, {
    message: 'This field is required',
  }),
});

export type JoinWaitlistFormData = z.infer<typeof joinWaitlistFormSchema>;
