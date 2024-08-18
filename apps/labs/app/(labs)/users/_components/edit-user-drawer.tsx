'use client';

import { Button } from '@repo/ui/button';
import { Input, InputWrapper } from '@repo/ui/input';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
  UpdateProjectGeneralInfoFormSchema,
  UpdateProjectGeneralInfoFormData,
} from '@/(labs)/_validators/projects-validators';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerScrollArea,
  DrawerContentContainer,
} from '@repo/ui/drawer';
import { User } from '@/(labs)/_interfaces/user';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import Utils from '@repo/utils';
import { Badge } from '@repo/ui/badge';
import { Clipboard } from '@repo/ui/clipboard';
import { LuCheck, LuCopy } from 'react-icons/lu';

type Props = {
  trigger: React.ReactNode;
  user: User;
};

export default function EditUserDrawer({
  trigger,
  user,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const form = useForm<UpdateProjectGeneralInfoFormData>({
    resolver: zodResolver(UpdateProjectGeneralInfoFormSchema),
  });
  const [isSaving, startSavingTransition] = useTransition();

  function onSubmit(payload: UpdateProjectGeneralInfoFormData) {
    startSavingTransition(async () => {});
  }

  function handleReset() {
    form.clearErrors();
  }

  return (
    <Drawer>
      <DrawerTrigger asChild onClick={handleReset}>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex gap-1.5">
            <Avatar size={'md'}>
              <AvatarFallback>
                {Utils.getFirstAndLastInitials(user?.fullName || '')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center gap-1.5 w-[17.625rem]">
              <div className="mt-1.5 truncate">{user?.fullName || '-'}</div>
              <div className="flex gap-0.5 h-[1.375rem]">
                <Badge variant={'outline'} size={'xs'} className="cursor-text">
                  UID: {user?.id?.substring(0, 4)}...
                  {user?.id?.substring(user?.id.length - 4)}
                </Badge>
                <Clipboard
                  size="xs"
                  variant="outline"
                  value={user?.id}
                  labels={[LuCopy, LuCheck]}
                />
              </div>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
          <DrawerScrollArea>
            <DrawerContentContainer>
              <div className="grid w-full items-center gap-4">
                <InputWrapper>
                  <Input
                    label="Full Name"
                    error={form.formState.errors.appName?.message}
                    {...form.register('appName')}
                  />
                </InputWrapper>
              </div>
            </DrawerContentContainer>
          </DrawerScrollArea>
          <DrawerFooter>
            <Button type="submit" loading={isSaving} className="w-full">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
