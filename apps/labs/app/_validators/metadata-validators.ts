import {
  METADATA_CONTEXT_OPTIONS,
  METADATA_TYPE_OPTIONS,
} from '@/_constants/metadata-constants';
import { z } from 'zod';

export const MetadataOptionSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  value: z.string().min(1, 'Value is required'),
});

export const CreateMetadataFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    key: z.string().min(1, 'Key is required').max(100, 'Key is too long'),
    description: z.string().max(255, 'Description is too long').optional(),
    type: z.enum(
      METADATA_TYPE_OPTIONS.map((option) => option.value) as [
        string,
        ...string[],
      ],
      {
        required_error: 'Type is required',
      },
    ),
    context: z.enum(
      METADATA_CONTEXT_OPTIONS.map((option) => option.value) as [
        string,
        ...string[],
      ],
      {
        required_error: 'Context is required',
      },
    ),
    options: z.array(MetadataOptionSchema).optional(),
  })
  .refine((data) => data.type !== 'List' || (data?.options?.length ?? 0) > 0, {
    message: 'Options are required for List type',
    path: ['options'],
  });

export const UpdateMetadataFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    type: z.enum(
      METADATA_TYPE_OPTIONS.map((option) => option.value) as [
        string,
        ...string[],
      ],
      {
        required_error: 'Type is required',
      },
    ),
    description: z.string().max(255, 'Description is too long').optional(),
    options: z.array(MetadataOptionSchema).optional(),
  })
  .refine((data) => data.type !== 'List' || (data?.options?.length ?? 0) > 0, {
    message: 'Options are required for List type',
    path: ['options'],
  });

export type CreateMetadataFormData = z.infer<typeof CreateMetadataFormSchema>;
export type UpdateMetadataFormData = z.infer<typeof UpdateMetadataFormSchema>;
export type MetadataOptionFormData = z.infer<typeof MetadataOptionSchema>;
