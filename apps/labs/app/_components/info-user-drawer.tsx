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
  DrawerFooter,
  DrawerClose,
} from '@repo/ui/drawer';
import { User } from '@/_interfaces/user';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import Utils from '@repo/utils';
import { Badge } from '@repo/ui/badge';
import BoxKeyValue from '@/_components/box-key-value';
import { Button } from '@repo/ui/button';
import EditUserDrawer from '@/_components/edit-user-drawer';
import { Typo } from '@repo/ui/typo';
import { useMetadataModels } from '@/_hooks/use-metadata-models';
import MetadataValueDisplay from './metadata-value-display';
import { Alert, AlertDescription } from '@repo/ui/alert';
import Link from 'next/link';
import { typoVariants } from '@repo/ui/typo';

type Props = {
  trigger?: React.ReactNode;
  user: User;
};

export default function InfoUserDrawer({
  user,
  trigger,
  ...props
}: Props & React.ComponentProps<typeof Drawer>) {
  const { metadataModels } = useMetadataModels('User');

  return (
    <Drawer {...props}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-1.5">
            <div className="flex items-center gap-2">
              <Avatar size={'md'}>
                <AvatarFallback>
                  {Utils.getFirstAndLastInitials(user?.fullName || '')}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center max-w-[17.625rem]">
                <div className="truncate">{user?.fullName || '-'}</div>
              </div>
            </div>
            <Badge
              variant={user?.active ? 'success' : 'destructive'}
              size={'md'}
              className="cursor-text"
            >
              {user?.active ? 'Active' : 'Inactive'}
            </Badge>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerScrollArea>
          <DrawerContentContainer>
            <div className="grid w-full items-center gap-6">
              <section>
                <header className="flex flex-col gap-0.5 mb-2">
                  <Typo variant="lg" className="flex items-center gap-1">
                    General
                  </Typo>
                </header>
                <div className="grid grid-cols-2 gap-4">
                  <BoxKeyValue label="Email" value={user?.email} withCopy />
                  <BoxKeyValue
                    label="Email Confirmed"
                    value={
                      <Badge
                        variant={
                          user?.emailConfirmed ? 'success' : 'destructive'
                        }
                        size={'sm'}
                        className="cursor-text"
                      >
                        {user?.emailConfirmed ? 'Confirmed' : 'Pending'}
                      </Badge>
                    }
                  />
                  <BoxKeyValue
                    label="Organization"
                    value={user?.organization?.name}
                  />
                  <BoxKeyValue
                    label="Last Sign In"
                    value={user?.lastSignIn}
                    date
                  />
                  <BoxKeyValue
                    label="Created At"
                    value={user?.createdAt}
                    date
                  />
                  <BoxKeyValue
                    label="Updated At"
                    value={user?.updatedAt}
                    date
                  />
                  <BoxKeyValue
                    label="Invited At"
                    value={user?.invitedAt}
                    date
                  />
                </div>
              </section>

              <section>
                <header className="flex flex-col gap-0.5 mb-2">
                  <Typo variant="lg" className="flex items-center gap-1">
                    Metadata
                  </Typo>
                </header>
                {metadataModels.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    <MetadataValueDisplay
                      metadataModels={metadataModels}
                      metadataValues={user?.metadata}
                    />
                  </div>
                ) : (
                  <Alert variant="info" size={'sm'}>
                    <AlertDescription>
                      No metadata models found.{' '}
                      <Link
                        href={`/${user?.environmentId}/metadata/models`}
                        className={typoVariants({ variant: 'link' })}
                      >
                        Create a metadata model
                      </Link>{' '}
                      to start adding custom fields to your users.
                    </AlertDescription>
                  </Alert>
                )}
              </section>

              <section>
                <header className="flex flex-col gap-0.5 mb-2">
                  <Typo variant="lg" className="flex items-center gap-1">
                    Advanced
                  </Typo>
                </header>
                <div className="space-y-3">
                  <BoxKeyValue
                    label="UID (User ID)"
                    value={user?.id}
                    withCopy
                  />
                </div>
              </section>
            </div>
          </DrawerContentContainer>
        </DrawerScrollArea>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button type="button" variant="ghost" size="md">
              Back
            </Button>
          </DrawerClose>
          <EditUserDrawer
            user={user}
            trigger={
              <Button type="button" size="md">
                Edit
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
