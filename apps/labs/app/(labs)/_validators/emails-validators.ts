import { z } from 'zod';

export const updateEmailTemplateFormSchema = z.object({
  subject: z
    .string({ required_error: 'Subject is required' })
    .min(1, 'Subject is required'),
  fromName: z
    .string({ required_error: 'From name is required' })
    .min(1, 'From name is required'),
  fromEmail: z
    .string({ required_error: 'From email is required' })
    .min(1, 'From email is required'),
  content: z
    .string({ required_error: 'Content is required' })
    .min(1, 'Content is required'),
  contentJSON: z.record(z.any()),
  bodyStyles: z.object({
    backgroundColor: z.string(),
    color: z.string(),
    padding: z
      .number({ invalid_type_error: 'Type some number' })
      .min(0, 'Must be greater than 0'),
  }),
  preview: z.string().optional().nullable(),
  replyTo: z.string().optional().nullable(),
});

export type UpdateEmailTemplatePayload = z.infer<
  typeof updateEmailTemplateFormSchema
>;
