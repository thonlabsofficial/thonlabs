'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/alert';
import { Badge } from '@repo/ui/badge';
import { Button } from '@repo/ui/button';
import { ButtonIcon } from '@repo/ui/button-icon';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerContentContainer,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerScrollArea,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/drawer';
import { ImagePreview } from '@repo/ui/image-preview';
import { Input, InputWrapper } from '@repo/ui/input';
import { InputSingleFile } from '@repo/ui/input-single-file';
import { Typo, typoVariants } from '@repo/ui/typo';
import { TrashIcon } from 'lucide-react';
import React, { useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import useOrganization from '@/_hooks/use-organization';
import {
  type NewOrganizationFormData,
  newOrganizationFormSchema,
} from '@/_validators/organizations-validators';

type Props = {
  trigger: React.ReactNode;
};

export default function NewOrganizationDrawer({
  trigger,
}: Props & React.ComponentProps<typeof Drawer>) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<NewOrganizationFormData>({
    defaultValues: {
      domains: [],
    },
    resolver: zodResolver(newOrganizationFormSchema),
  });
  const domainsFields = useFieldArray<NewOrganizationFormData>({
    control: form.control,
    name: 'domains',
  });
  const logo = form.watch('logo');
  const logoPreview = logo?.[0] ? URL.createObjectURL(logo[0]) : '';
  const [isCreatingOrganization, startTransitionCreatingOrganization] =
    useTransition();
  const { createOrganization } = useOrganization();

  function onSubmit(payload: NewOrganizationFormData) {
    startTransitionCreatingOrganization(async () => {
      try {
        await createOrganization(payload);
        setOpen(false);
      } catch {}
    });
  }

  function handleReset() {
    form.clearErrors();
    form.reset();
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild onClick={handleReset}>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>New Organization</DrawerTitle>
          <DrawerDescription>
            Complete the information below to create a new organization.
          </DrawerDescription>
        </DrawerHeader>
        <form className='h-full' onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className='grid w-full items-center gap-4'>
                <InputWrapper>
                  <Input
                    label='Name'
                    maxLength={30}
                    error={form.formState.errors.name?.message}
                    {...form.register('name')}
                  />
                </InputWrapper>

                <section>
                  <header className='mb-2 flex flex-col gap-0.5'>
                    <Typo variant='lg' className='flex items-center gap-1'>
                      Logo{' '}
                      <Badge variant='info' size={'sm'}>
                        Optional
                      </Badge>
                    </Typo>
                    <Typo variant='muted'>
                      Used in email templates and consumed from our APIs.
                      Recommended size is 1024px of width.
                    </Typo>
                    {!logo && (
                      <Alert variant='info' size={'sm'} className='mt-2'>
                        <AlertDescription>
                          Max size: 50MB - Allowed files: PNG, JPG, JPEG, WEBP
                          or SVG
                        </AlertDescription>
                      </Alert>
                    )}
                  </header>

                  <InputWrapper>
                    <InputSingleFile
                      form={form}
                      allowedExtensions={['png', 'jpg', 'jpeg', 'webp', 'svg']}
                      maxFileSizeInMB={50}
                      replaceBy={<ImagePreview src={logoPreview} />}
                      {...form.register('logo')}
                    />
                  </InputWrapper>
                </section>

                <section>
                  <header className='mb-2 flex flex-col gap-0.5'>
                    <Typo variant='lg' className='flex items-center gap-1'>
                      Domains{' '}
                      <Badge variant='info' size={'sm'}>
                        Optional
                      </Badge>
                    </Typo>
                    <Typo variant='muted' className='text-sm'>
                      Allow sign up and invitation from email addresses with
                      these domains.
                    </Typo>
                  </header>

                  <div className='flex flex-col gap-1.5'>
                    {domainsFields.fields.map((field, index) => (
                      <div key={field.id} className='flex gap-2'>
                        <InputWrapper className='flex-1'>
                          <Input
                            {...form.register(`domains.${index}.domain`)}
                            placeholder='e.g.: example.com'
                          />
                        </InputWrapper>
                        <ButtonIcon
                          icon={TrashIcon}
                          type='button'
                          variant='destructive'
                          size='sm'
                          onClick={() => domainsFields.remove(index)}
                          className='!basis-11 h-11 flex-none'
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    className='mt-2 w-full'
                    onClick={() => domainsFields.append({ domain: '' })}
                  >
                    Add Domain
                  </Button>

                  {domainsFields.fields.length === 0 && (
                    <Alert variant='info' size={'sm'} className='mt-2'>
                      <AlertTitle>Good to Know</AlertTitle>
                      <AlertDescription>
                        Without specified domains, users can only join{' '}
                        <span
                          className={typoVariants({ variant: 'underline' })}
                        >
                          through direct invitations
                        </span>
                        .
                      </AlertDescription>
                    </Alert>
                  )}
                </section>
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                type='button'
                variant='ghost'
                disabled={isCreatingOrganization}
              >
                Cancel
              </Button>
            </DrawerClose>
            <Button type='submit' loading={isCreatingOrganization}>
              {isCreatingOrganization ? 'Creating...' : 'Create Organization'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
