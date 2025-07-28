'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@repo/ui/badge';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card';
import { cn } from '@repo/ui/core/utils';
import Editor from '@repo/ui/editor';
import { Input, InputWrapper } from '@repo/ui/input';
import { InputColorPicker } from '@repo/ui/input-color-picker';
import { Skeleton } from '@repo/ui/skeleton';
import { Typo } from '@repo/ui/typo';
import { Plus } from 'lucide-react';
import React, { useTransition } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import useEmailTemplate from '@/_hooks/use-email-template';
import { EmailTemplateTypes } from '@/_interfaces/email-template';
import {
  type UpdateEmailTemplatePayload,
  updateEmailTemplateFormSchema,
} from '@/_validators/emails-validators';

const EmailInput = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    error?: boolean;
    loading?: boolean;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ className, label, error, loading, ...props }, ref) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 border-zinc-200 border-b border-solid py-2 hover:border-zinc-300 focus:border-zinc-400',
        {
          'border-destructive hover:border-destructive focus:border-destructive':
            error,
        },
        className
      )}
    >
      <Typo variant={'sm'} as='label' className='flex-0 text-zinc-500'>
        {label}
      </Typo>
      {!loading ? (
        <input
          type='text'
          className={`w-full flex-1 bg-transparent text-sm text-zinc-900`}
          ref={ref}
          {...props}
        />
      ) : (
        <Skeleton className='!w-40 h-6' forceTheme='light' />
      )}
    </div>
  );
});

export default function EditEmailTemplate({
  templateId,
}: {
  templateId: string;
}) {
  const {
    emailTemplate,
    isLoadingEmailTemplate,
    updateEmailTemplate,
    parseHTMLEmailTemplate,
  } = useEmailTemplate({
    templateId,
  });
  const form = useForm<UpdateEmailTemplatePayload>({
    values: {
      bodyStyles: emailTemplate?.bodyStyles,
      fromEmail: emailTemplate?.fromEmail,
      fromName: emailTemplate?.fromName,
      preview: emailTemplate?.preview,
      replyTo: emailTemplate?.replyTo,
      subject: emailTemplate?.subject,
      contentJSON: emailTemplate?.contentJSON,
      content: emailTemplate?.content,
    } as UpdateEmailTemplatePayload,
    resolver: zodResolver(updateEmailTemplateFormSchema),
  });

  const [isSaving, startSavingTransition] = useTransition();
  const [optionalFields, setOptionalFields] = React.useState<
    Record<string, boolean>
  >({
    replyTo: false,
    preview: false,
  });
  const bodyStyles = useWatch({ control: form.control, name: 'bodyStyles' });

  React.useEffect(() => {
    if (emailTemplate?.preview && !optionalFields.preview) {
      setOptionalFields((prevValue) => ({
        ...prevValue,
        preview: true,
      }));
    }

    if (emailTemplate?.replyTo && !optionalFields.replyTo) {
      setOptionalFields((prevValue) => ({
        ...prevValue,
        replyTo: true,
      }));
    }
  }, [
    emailTemplate?.preview,
    emailTemplate?.replyTo,
    optionalFields.preview,
    optionalFields.replyTo,
  ]);

  function onSubmit(payload: UpdateEmailTemplatePayload) {
    payload.content = parseHTMLEmailTemplate(
      payload.content,
      payload.bodyStyles
    );

    startSavingTransition(async () => {
      try {
        await updateEmailTemplate(templateId, payload);
        form.reset();
      } catch {}
    });
  }

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 xl:grid-cols-[1fr_48rem] xl:gap-5 2xl:grid-cols-[1fr_55rem] 2xl:gap-20'>
          <div className='flex flex-col gap-10'>
            <CardHeader
              padding
              className='max-w-sm'
              description={
                <>
                  Render dynamic emails with ease. Use{' '}
                  <a
                    href='https://ejs.co/#docs'
                    target='_blank'
                    rel='noreferrer noopener nofollow'
                  >
                    <Typo variant={'codeLink'}>ejs</Typo>
                  </a>{' '}
                  engine to build personalized content for your users.
                </>
              }
            >
              Template
            </CardHeader>
            <CardContent className='flex flex-col gap-10 p-6'>
              <div>
                <header className='flex max-w-sm flex-col'>
                  <Typo>Available Variables</Typo>
                  <Typo variant={'muted'}>
                    You can use our variables in different parts of your
                    template. It's possible to add it to the sender name,
                    subject, preview, and email content.
                  </Typo>
                </header>

                <div className='mt-6 flex flex-col gap-8'>
                  <section className='grid grid-cols-[8rem_1fr] items-center gap-3'>
                    <Typo variant={'xs'} className='flex-0 font-semibold'>
                      User
                    </Typo>
                    <div className='flex flex-1 flex-wrap gap-2'>
                      <Badge variant={'outline'}>user.firstName</Badge>
                      <Badge variant={'outline'}>user.fullName</Badge>
                      <Badge variant={'outline'}>user.id</Badge>
                      <Badge variant={'outline'}>user.email</Badge>
                      <Badge variant={'outline'}>user.lastSignIn</Badge>
                      <Badge variant={'outline'}>user.emailConfirmed</Badge>
                    </div>
                  </section>

                  <hr className='border-foreground/[0.08]' />

                  <section className='grid grid-cols-[8rem_1fr] items-center gap-3'>
                    <Typo variant={'xs'} className='flex-0 font-semibold'>
                      Environment
                    </Typo>
                    <div className='flex flex-1 flex-wrap gap-2'>
                      <Badge variant={'outline'}>environment.id</Badge>
                      <Badge variant={'outline'}>environment.name</Badge>
                      <Badge variant={'outline'}>environment.appURL</Badge>
                      <Badge variant={'outline'}>environment.emailDomain</Badge>
                      <Badge variant={'outline'}>environment.project.id</Badge>
                      <Badge variant={'outline'}>
                        environment.project.name
                      </Badge>
                    </div>
                  </section>

                  {emailTemplate?.type === EmailTemplateTypes.Invite && (
                    <>
                      <hr className='border-foreground/[0.08]' />
                      <section className='grid grid-cols-[8rem_1fr] items-center gap-3'>
                        <Typo variant={'xs'} className='flex-0 font-semibold'>
                          Inviter
                        </Typo>
                        <div className='flex flex-1 flex-wrap gap-2'>
                          <Badge variant={'outline'}>inviter.fullName</Badge>
                          <Badge variant={'outline'}>inviter.email</Badge>
                        </div>
                      </section>
                    </>
                  )}

                  {emailTemplate?.type &&
                    [
                      EmailTemplateTypes.Invite,
                      EmailTemplateTypes.MagicLink,
                      EmailTemplateTypes.ForgotPassword,
                      EmailTemplateTypes.ConfirmEmail,
                    ].includes(emailTemplate.type) && (
                      <>
                        <hr className='border-foreground/[0.08]' />
                        <section className='grid grid-cols-[8rem_1fr] items-center gap-3'>
                          <Typo variant={'xs'} className='flex-0 font-semibold'>
                            Other
                          </Typo>
                          <div className='flex flex-1 flex-wrap gap-2'>
                            <Badge variant={'outline'}>token</Badge>
                          </div>
                        </section>
                      </>
                    )}
                </div>
              </div>

              <div>
                <header className='flex max-w-sm flex-col'>
                  <Typo>Email Styles</Typo>
                  <Typo variant={'muted'}>
                    Update general styles for the email body. Other parts of the
                    content can be updated directly in the editor.
                  </Typo>
                </header>

                <div className='mt-6 flex flex-col gap-3'>
                  <section className='grid grid-cols-[8rem_1fr] items-center gap-3'>
                    <Typo variant={'xs'} className='flex-0 font-semibold'>
                      Background Color
                    </Typo>
                    <div className='flex flex-1 flex-wrap gap-2'>
                      <Controller
                        name='bodyStyles.backgroundColor'
                        control={form.control}
                        render={({ field, formState }) => (
                          <InputColorPicker
                            className='!w-24'
                            size='xs'
                            setValue={form.setValue}
                            name={field.name}
                            value={field.value}
                            onInputChange={field.onChange}
                            error={
                              formState.errors.bodyStyles?.backgroundColor
                                ?.message
                            }
                          />
                        )}
                      />
                    </div>
                  </section>
                  <section className='grid grid-cols-[8rem_1fr] items-center gap-3'>
                    <Typo variant={'xs'} className='flex-0 font-semibold'>
                      Font Color
                    </Typo>
                    <div className='flex flex-1 flex-wrap gap-2'>
                      <Controller
                        name='bodyStyles.color'
                        control={form.control}
                        render={({ field, formState }) => (
                          <InputColorPicker
                            className='!w-24'
                            size='xs'
                            setValue={form.setValue}
                            name={field.name}
                            value={field.value}
                            onInputChange={field.onChange}
                            error={formState.errors.bodyStyles?.color?.message}
                          />
                        )}
                      />
                    </div>
                  </section>
                  <section className='grid grid-cols-[8rem_1fr] items-center gap-3'>
                    <Typo variant={'xs'} className='flex-0 font-semibold'>
                      Padding
                    </Typo>
                    <InputWrapper className='w-24'>
                      <Input
                        type='number'
                        size={'xs'}
                        error={
                          form.formState.errors.bodyStyles?.padding?.message
                        }
                        {...form.register('bodyStyles.padding', {
                          valueAsNumber: true,
                        })}
                        loading={isLoadingEmailTemplate}
                      />
                    </InputWrapper>
                  </section>
                </div>
              </div>
            </CardContent>
          </div>
          <CardContent className='flex-1 p-6'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col space-y-1.5 rounded-sm bg-foreground px-6 pt-3 pb-6'>
                <div className='mb-4'>
                  <EmailInput
                    label='Sender Name:'
                    error={!!form.formState.errors.fromName}
                    loading={isLoadingEmailTemplate}
                    {...form.register('fromName')}
                  />
                  <EmailInput
                    label='Sender Email:'
                    error={!!form.formState.errors.fromEmail}
                    loading={isLoadingEmailTemplate}
                    {...form.register('fromEmail')}
                  />
                  <EmailInput
                    label='Subject:'
                    error={!!form.formState.errors.subject}
                    loading={isLoadingEmailTemplate}
                    {...form.register('subject')}
                  />
                  <EmailInput
                    label='Reply To:'
                    className={cn({
                      hidden: !optionalFields.replyTo,
                    })}
                    loading={isLoadingEmailTemplate}
                    {...form.register('replyTo')}
                  />
                  <EmailInput
                    label='Preview:'
                    className={cn({
                      hidden: !optionalFields.preview,
                    })}
                    loading={isLoadingEmailTemplate}
                    {...form.register('preview')}
                  />
                  <div className='flex items-center gap-3'>
                    {!optionalFields.replyTo && (
                      <Button
                        variant='ghost'
                        size={'xs'}
                        icon={Plus}
                        className='mt-2 px-0 text-zinc-500 hover:text-zinc-900'
                        onClick={() => {
                          setOptionalFields((prevValue) => ({
                            ...prevValue,
                            replyTo: true,
                          }));
                        }}
                        disabled={isLoadingEmailTemplate}
                      >
                        Add Reply To
                      </Button>
                    )}
                    {!optionalFields.preview && (
                      <Button
                        variant='ghost'
                        size={'xs'}
                        icon={Plus}
                        className='mt-2 px-0 text-zinc-500 hover:text-zinc-900'
                        onClick={() => {
                          setOptionalFields((prevValue) => ({
                            ...prevValue,
                            preview: true,
                          }));
                        }}
                        disabled={isLoadingEmailTemplate}
                      >
                        Add Preview
                      </Button>
                    )}
                  </div>
                </div>

                <div style={bodyStyles}>
                  <Editor
                    initialValue={emailTemplate?.contentJSON}
                    onUpdate={({ editor }) => {
                      const contentJSON = editor.getJSON();
                      const contentHTML = editor.getHTML();

                      form.setValue('contentJSON', contentJSON, {
                        shouldDirty: true,
                      });
                      form.setValue('content', contentHTML, {
                        shouldDirty: true,
                      });
                    }}
                    onCreate={({ editor }) => {
                      const contentJSON = editor.getJSON();
                      const contentHTML = editor.getHTML();

                      form.setValue('contentJSON', contentJSON);
                      form.setValue('content', contentHTML);
                    }}
                    loading={isLoadingEmailTemplate}
                  />
                </div>
              </div>
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
  );
}
