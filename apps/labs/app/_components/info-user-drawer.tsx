'use client';

import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerScrollArea,
  DrawerContentContainer,
} from '@repo/ui/drawer';
import { User } from '@/_interfaces/user';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import Utils from '@repo/utils';
import { Badge } from '@repo/ui/badge';
import BoxKeyValue from '@/_components/box-key-value';

type Props = {
  trigger?: React.ReactNode;
  user: User;
};

export default function InfoUserDrawer({
  user,
  trigger,
  ...props
}: Props & React.ComponentProps<typeof Drawer>) {
  return (
    <Drawer {...props}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex gap-1.5">
            <Avatar size={'md'}>
              <AvatarFallback>
                {Utils.getFirstAndLastInitials(user?.fullName || '')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center w-[17.625rem]">
              <div className="truncate">{user?.fullName || '-'}</div>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerScrollArea>
          <DrawerContentContainer>
            <div className="grid w-full items-center gap-4">
              <BoxKeyValue label="UID (User ID)" value={user?.id} withCopy />
              <BoxKeyValue label="Full Name" value={user?.fullName} />
              <BoxKeyValue label="Email" value={user?.email} withCopy />
              <BoxKeyValue
                label="Organization"
                value={user?.organization?.name}
              />
              <BoxKeyValue
                label="Status"
                value={
                  <Badge
                    variant={user?.active ? 'success' : 'destructive'}
                    size={'sm'}
                    className="cursor-text"
                  >
                    {user?.active ? 'Active' : 'Inactive'}
                  </Badge>
                }
              />
              <BoxKeyValue
                label="Email Confirmed"
                value={
                  <Badge
                    variant={user?.emailConfirmed ? 'success' : 'destructive'}
                    size={'sm'}
                    className="cursor-text"
                  >
                    {user?.emailConfirmed ? 'Confirmed' : 'Pending'}
                  </Badge>
                }
              />
              <BoxKeyValue label="Last Sign In" value={user?.lastSignIn} date />
              <BoxKeyValue label="Invited At" value={user?.invitedAt} date />
              <BoxKeyValue label="Created At" value={user?.createdAt} date />
              <BoxKeyValue label="Updated At" value={user?.updatedAt} date />
            </div>
          </DrawerContentContainer>
        </DrawerScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
