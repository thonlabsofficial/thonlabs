'use client';

import { Input, InputWrapper } from '@repo/ui/input';
import { Controller, UseFormReturn } from 'react-hook-form';
import React from 'react';
import { Metadata } from '@/_interfaces/metadata';
import { InputSwitch } from '@repo/ui/input-switch';
import {
  InputSelect,
  InputSelectContent,
  InputSelectItem,
  InputSelectTrigger,
  InputSelectValue,
} from '@repo/ui/input-select';
import { cn } from '@repo/ui/core/utils';
import { Typo } from '@repo/ui/typo';
import { Alert, AlertDescription } from '@repo/ui/alert';
import Link from 'next/link';
import { typoVariants } from '@repo/ui/typo';
import { useParams } from 'next/navigation';
import { InputMessage } from '@repo/ui/input-message';

interface Props {
  form: UseFormReturn<any>;
  metadataModels: Metadata[];
  context: 'users' | 'organizations' | 'environments';
}

function MetadataModelInfo({ model }: { model: Metadata }) {
  return (
    <div className="flex flex-col gap-1 justify-center">
      <Typo variant="sm">{model.name}</Typo>
      {model.description && (
        <span className="text-zinc-500 text-xs">{model.description}</span>
      )}
    </div>
  );
}

export default function MetadataValueForm({
  form,
  metadataModels,
  context,
}: Props) {
  const { environmentId } = useParams();

  const getErrorMessage = (key: string): string | undefined => {
    const metadataErrors = form.formState.errors.metadata as any;
    return metadataErrors?.[key]?.message;
  };

  const renderMetadataInput = (model: Metadata) => {
    const fieldName = `metadata.${model.key}` as const;
    const inputWrapperClassName = cn('grid grid-cols-[20rem_1fr] gap-1');
    const error = getErrorMessage(model.key);

    switch (model.type) {
      case 'String':
        return (
          <InputWrapper className={inputWrapperClassName} key={model.id}>
            <MetadataModelInfo model={model} />
            <div>
              <Input error={error} {...form.register(fieldName)} />
            </div>
          </InputWrapper>
        );

      case 'JSON':
        return (
          <InputWrapper className={inputWrapperClassName} key={model.id}>
            <MetadataModelInfo model={model} />
            <div>
              <Input
                error={error}
                {...form.register(fieldName, {
                  setValueAs: (value) => {
                    if (!value || value.trim() === '') {
                      return {};
                    }

                    try {
                      return JSON.parse(value);
                    } catch {
                      return value; // Return as is if invalid, validation will catch it
                    }
                  },
                })}
              />
            </div>
          </InputWrapper>
        );

      case 'Number':
        return (
          <InputWrapper className={inputWrapperClassName} key={model.id}>
            <MetadataModelInfo model={model} />
            <div>
              <Input
                type="number"
                step="any"
                error={error}
                {...form.register(fieldName, {
                  setValueAs: (value) => {
                    if (value === '' || value === null || value === undefined) {
                      return undefined;
                    }
                    const num = parseFloat(value);
                    return isNaN(num) ? undefined : num;
                  },
                })}
              />
            </div>
          </InputWrapper>
        );

      case 'Boolean':
        return (
          <InputWrapper className={inputWrapperClassName} key={model.id}>
            <MetadataModelInfo model={model} />
            <Controller
              name={fieldName}
              control={form.control}
              render={({ field }) => (
                <InputSwitch
                  value={field.value}
                  onCheckedChange={field.onChange}
                  checked={!!field.value}
                />
              )}
            />
          </InputWrapper>
        );

      case 'List':
        return (
          <InputWrapper className={inputWrapperClassName} key={model.id}>
            <Controller
              name={fieldName}
              control={form.control}
              render={({ field }) => (
                <InputSelect onValueChange={field.onChange} value={field.value}>
                  <MetadataModelInfo model={model} />
                  <div>
                    <InputSelectTrigger
                      error={getErrorMessage(model.key)}
                      // onClear={() => field.onChange('')}
                      value={field.value}
                    >
                      <InputSelectValue />
                    </InputSelectTrigger>
                  </div>
                  <InputSelectContent>
                    {model.options?.map((option) => (
                      <InputSelectItem key={option.value} value={option.value}>
                        {option.label}
                      </InputSelectItem>
                    ))}
                  </InputSelectContent>
                </InputSelect>
              )}
            />
          </InputWrapper>
        );

      default:
        return null;
    }
  };

  if (metadataModels.length === 0) {
    return (
      <Alert variant="info" size={'sm'}>
        <AlertDescription>
          No metadata models found.{' '}
          <Link
            href={`/${environmentId}/metadata/models`}
            className={typoVariants({ variant: 'link' })}
          >
            Create a metadata model
          </Link>{' '}
          to start adding custom fields to your {context}.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      {metadataModels.map((model) => renderMetadataInput(model))}
    </div>
  );
}
