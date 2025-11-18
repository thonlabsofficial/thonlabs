'use client';

import { Input, InputWrapper } from '@repo/ui/input';
import { Button } from '@repo/ui/button';
import { XIcon } from 'lucide-react';
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form';
import Utils from '@repo/utils';
import React from 'react';
import { ButtonIcon } from '@repo/ui/button-icon';
import { cn } from '@repo/ui/core/utils';
import { Typo } from '@repo/ui/typo';

interface Props {
  form: UseFormReturn<any>;
}

export default function MetadataModelListOptionsForm({ form }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options',
  });

  const handleAddOption = () => {
    append({ label: '', value: '' });
  };

  const handleLabelChange = (index: number, label: string) => {
    const normalizedValue = Utils.normalizeString(label, '_');
    const formValues = form.getValues() as any;
    formValues.options[index].value = normalizedValue;
  };

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-start">
          <InputWrapper className="flex-1">
            <Controller
              name={`options.${index}.label`}
              control={form.control}
              render={({ field }) => (
                <Input
                  label={index === 0 ? 'Label' : undefined}
                  placeholder="Label"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleLabelChange(index, e.target.value);
                  }}
                  error={
                    (form.formState.errors?.options as any)?.[index]?.label
                      ?.message
                  }
                />
              )}
            />
          </InputWrapper>
          <InputWrapper className="flex-1">
            <Input
              label={index === 0 ? 'Value' : undefined}
              placeholder="Value"
              {...form.register(`options.${index}.value`)}
              error={
                (form.formState.errors?.options as any)?.[index]?.value?.message
              }
            />
          </InputWrapper>
          <ButtonIcon
            icon={XIcon}
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
            className={cn(
              '!basis-11 flex-none h-11',
              index === 0 ? 'mt-[1.15rem]' : '',
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={handleAddOption}
        className="w-full"
      >
        Add Option
      </Button>
    </div>
  );
}
