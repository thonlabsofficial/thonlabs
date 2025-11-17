'use client';

import { Input, InputWrapper } from '@repo/ui/input';
import { InputSwitch } from '@repo/ui/input-switch';
import { Button } from '@repo/ui/button';
import { X, Plus } from 'lucide-react';
import { Control, Controller, useFieldArray, UseFormRegister } from 'react-hook-form';
import {
  CreateMetadataFormData,
  UpdateMetadataFormData,
} from '@/_validators/metadata-validators';
import Utils from '@repo/utils';
import React from 'react';
import { MetadataType } from '@/_interfaces/metadata';

interface Props {
  control: Control<CreateMetadataFormData | UpdateMetadataFormData>;
  register: UseFormRegister<CreateMetadataFormData | UpdateMetadataFormData>;
  errors: any;
  type?: MetadataType;
  watchName?: string;
}

export default function MetadataFormFields({
  control,
  register,
  errors,
  type,
  watchName,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const handleAddOption = () => {
    append({ label: '', value: '' });
  };

  const handleLabelChange = (index: number, label: string) => {
    const normalizedValue = Utils.normalizeString(label, '_');
    // Update the value field automatically
    const form = control as any;
    form._formValues.options[index].value = normalizedValue;
  };

  // Render different fields based on type
  const renderTypeFields = () => {
    switch (type) {
      case 'String':
        return (
          <InputWrapper>
            <Input label="Preview" placeholder="Text value" disabled />
          </InputWrapper>
        );
      case 'Number':
        return (
          <InputWrapper>
            <Input label="Preview" type="number" placeholder="0" disabled />
          </InputWrapper>
        );
      case 'Boolean':
        return (
          <InputWrapper>
            <InputSwitch
              label="Preview"
              description="Boolean value"
              checked={false}
              disabled
            />
          </InputWrapper>
        );
      case 'JSON':
        return (
          <InputWrapper>
            <Input
              label="Preview"
              placeholder='{"key": "value"}'
              disabled
            />
          </InputWrapper>
        );
      case 'List':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Options</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddOption}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Option
              </Button>
            </div>
            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No options added yet. Click "Add Option" to create one.
              </p>
            )}
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <InputWrapper className="flex-1">
                  <Controller
                    name={`options.${index}.label`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        label={index === 0 ? 'Label' : undefined}
                        placeholder="Option label"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleLabelChange(index, e.target.value);
                        }}
                        error={errors?.options?.[index]?.label?.message}
                      />
                    )}
                  />
                </InputWrapper>
                <InputWrapper className="flex-1">
                  <Input
                    label={index === 0 ? 'Value' : undefined}
                    placeholder="option_value"
                    {...register(`options.${index}.value`)}
                    error={errors?.options?.[index]?.value?.message}
                  />
                </InputWrapper>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className={index === 0 ? 'mt-[26px]' : ''}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderTypeFields()}</>;
}
