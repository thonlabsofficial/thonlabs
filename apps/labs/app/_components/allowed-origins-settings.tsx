'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import useEnvironment from '@/_hooks/use-environment';
import { Card, CardHeader, CardContent, CardFooter } from '@repo/ui/card';
import { InputWrapper, Input } from '@repo/ui/input';
import { Button } from '@repo/ui/button';
import { useForm, useFieldArray } from 'react-hook-form';
import { Trash2 } from 'lucide-react';

export default function AllowedOriginsSettings() {
  const { environmentId } = useParams();

  // VITOR > Verify later if essential
  // const { environment, isLoadingEnvironment } = useEnvironment({
  //   environmentId: environmentId as string,
  // });

  type FormValues = {
    originUrls: { value: string }[];
  };

  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      originUrls: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'originUrls',
  });

  const trashIcon = () => {
    return <Trash2 />;
  };

  return (
    <>
      <Card>
        <div className="grid grid-cols-[19rem_1fr] gap-40">
          <CardHeader
            padding
            description="List of origins permitted for access."
          >
            Origin URLs
          </CardHeader>
          <CardContent className="flex-1 p-6">
            {fields.map((fields, index) => (
              <div key={fields.id} className="flex gap-2 mb-4">
                <Input
                  className="border p-1 flex-1"
                  placeholder="e.g.: https://acme.com or https://sub.acme.com"
                  {...register(`originUrls.${index}.value`)}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className={
                    index === 0 ? 'opacity-0 cursor-default' : 'text-red-500'
                  }
                  disabled={index === 0}
                >
                  {trashIcon()}
                </button>
              </div>
            ))}

            <div className="flex justify-end">
              <Button
                type="button"
                size={'sm'}
                onClick={() => append({ value: '' })}
              >
                Add URL
              </Button>
            </div>
          </CardContent>
        </div>

        <CardFooter className="flex justify-end gap-2">
          <Button
            type="button"
            size={'sm'}
            onClick={() => console.log('---TESTE SALVANDO AS ULRS---')}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
