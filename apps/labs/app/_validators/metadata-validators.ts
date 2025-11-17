import { z } from 'zod';

export const MetadataOptionSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  value: z.string().min(1, 'Value is required'),
});

export const CreateMetadataFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  key: z.string().min(1, 'Key is required').max(100, 'Key is too long'),
  type: z.enum(['String', 'Number', 'Boolean', 'JSON', 'List'], {
    required_error: 'Type is required',
  }),
  context: z.enum(['User', 'Organization'], {
    required_error: 'Context is required',
  }),
  options: z.array(MetadataOptionSchema).optional(),
});

export const UpdateMetadataFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  options: z.array(MetadataOptionSchema).optional(),
});

export type CreateMetadataFormData = z.infer<typeof CreateMetadataFormSchema>;
export type UpdateMetadataFormData = z.infer<typeof UpdateMetadataFormSchema>;
export type MetadataOptionFormData = z.infer<typeof MetadataOptionSchema>;
