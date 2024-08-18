'use client';

import React from 'react';
import { Button } from '@repo/ui/button';
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
import BoxKeyValue from '@/(labs)/_components/box-key-value';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown';
import { LuFileEdit, LuTrash2 } from 'react-icons/lu';
import useUserSession from '@/(labs)/_hooks/use-user-session';

type Props = {
  trigger: React.ReactNode;
  user: User;
};

export default function InfoUserDrawer({
  trigger,
  user,
}: Props & React.HTMLAttributes<HTMLElement>) {
  const { user: authUser } = useUserSession();
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
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
              <div className="flex gap-0.5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={'xs'} variant={'outline'}>
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <LuFileEdit className="mr-2 h-4 w-4" />
                        <span>Edit User</span>
                      </DropdownMenuItem>
                      {authUser?.id !== user.id && (
                        <DropdownMenuItem className="text-red-400 hover:bg-destructive/10">
                          <LuTrash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
              <BoxKeyValue label="Last Sign In" value={user?.lastSignIn} date />
              <BoxKeyValue label="Created At" value={user?.createdAt} date />
              <BoxKeyValue label="Updated At" value={user?.updatedAt} date />
            </div>
          </DrawerContentContainer>
        </DrawerScrollArea>
        <DrawerFooter>
          <Button type="button" variant={'secondary'} className="w-full">
            Edit User
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
