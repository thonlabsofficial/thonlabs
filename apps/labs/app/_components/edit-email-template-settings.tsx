'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { InputSwitch } from '@repo/ui/input-switch';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import emailTemplatesConstants from '@/_constants/email-templates-constants';
import useEmailTemplate from '@/_hooks/use-email-template';
import {
  type UpdateEmailTemplateStatusPayload,
  updateEmailTemplateStatusFormSchema,
} from '@/_validators/emails-validators';

interface Props {
  templateId: string;
}

export default function EditEmailTemplateSettings({ templateId }: Props) {
  const { isLoadingEmailTemplate, updateStatus, emailTemplate } =
    useEmailTemplate(
      { templateId },
      {
        onFetchComplete: () => {
          form.reset({
            enabled: emailTemplate?.enabled || false,
          });
        },
      }
    );

  const form = useForm<UpdateEmailTemplateStatusPayload>({
    resolver: zodResolver(updateEmailTemplateStatusFormSchema),
  });

  const [isSaving, startSavingTransition] = useTransition();

  function onSubmit(payload: UpdateEmailTemplateStatusPayload) {
    startSavingTransition(async () => {
      updateStatus(templateId, payload).then(() => {
        form.reset({
          enabled: payload.enabled,
        });
      });
    });
  }

  return (
    emailTemplate &&
    emailTemplatesConstants.allowedStatusChange.includes(
      emailTemplate.type
    ) && (
      <Card>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-[1fr_48rem] xl:gap-5 2xl:grid-cols-[1fr_55rem] 2xl:gap-20'>
            <CardHeader>Settings</CardHeader>
            <CardContent className='flex-1 p-6'>
              <div className='grid gap-5'>
                <Controller
                  name='enabled'
                  control={form.control}
                  render={({ field }) => (
                    <InputSwitch
                      label='Enable Sending'
                      description='Allow this email template to be sent to users.'
                      value={field.value}
                      onCheckedChange={field.onChange}
                      checked={!!field.value}
                      loading={isLoadingEmailTemplate}
                    />
                  )}
                />
              </div>
            </CardContent>
          </div>
          <CardFooter className='flex justify-end gap-2'>
            <Button
              type='button'
              size={'sm'}
              variant={'ghost'}
              disabled={!form.formState.isDirty || isSaving}
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              size={'sm'}
              disabled={!form.formState.isDirty || isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    )
  );
}
