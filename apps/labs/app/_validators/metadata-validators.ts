import {
  METADATA_CONTEXT_OPTIONS,
  METADATA_TYPE_OPTIONS,
} from '@/_constants/metadata-constants';
import { Metadata } from '@/_interfaces/metadata';
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
    options: z.array(z.any()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'List') {
      if (!data.options || data.options.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Options are required for List type',
          path: ['options'],
        });
        return;
      }

      data.options.forEach((option, index) => {
        const result = MetadataOptionSchema.safeParse(option);
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            ctx.addIssue({
              ...issue,
              path: ['options', index, ...issue.path],
            });
          });
        }
      });

      const hasValidOption = data.options.some(
        (option) => option.label?.trim() && option.value?.trim(),
      );
      if (!hasValidOption) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least one option with label and value is required',
          path: ['options'],
        });
      }
    }
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

/**
 * Creates a Zod schema for a single metadata field based on its type
 */
const createMetadataFieldSchema = (model: Metadata) => {
  const baseErrorMsg = 'This field is required';

  switch (model.type) {
    case 'String':
      return z
        .string({ required_error: baseErrorMsg })
        .min(1, { message: baseErrorMsg });

    case 'Number':
      return z
        .number({ required_error: baseErrorMsg })
        .refine((val) => val !== null && val !== undefined, {
          message: baseErrorMsg,
        });

    case 'Boolean':
      return z.boolean({ required_error: baseErrorMsg }).default(false);

    case 'List':
      return z
        .string({ required_error: baseErrorMsg })
        .min(1, { message: baseErrorMsg })
        .refine(
          (value) => {
            // Validate that the selected value is in the available options
            return model.options?.some((opt) => opt.value === value);
          },
          { message: 'Please select a valid option' },
        );

    case 'JSON':
      return z
        .any()
        .refine(
          (value) => {
            // Must be a valid object or array
            return typeof value === 'object' && value !== null;
          },
          { message: baseErrorMsg },
        )
        .refine(
          (value) => {
            // Validate it's proper JSON structure
            try {
              JSON.stringify(value);
              return true;
            } catch {
              return false;
            }
          },
          { message: 'Must be valid JSON' },
        );

    default:
      return z.any();
  }
};

/**
 * Creates a metadata schema object based on the metadata models
 */
export const createMetadataSchema = (metadataModels: Metadata[]) => {
  if (metadataModels.length === 0) {
    return z.record(z.string(), z.any()).optional();
  }

  const metadataShape: Record<string, z.ZodTypeAny> = {};

  metadataModels.forEach((model) => {
    metadataShape[model.key] = createMetadataFieldSchema(model);
  });

  return z.object(metadataShape);
};
