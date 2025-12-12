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
import { Organization } from '@/_interfaces/organization';
import { Badge } from '@repo/ui/badge';
import BoxKeyValue from '@/_components/box-key-value';
import { Button } from '@repo/ui/button';
import { Typo } from '@repo/ui/typo';
import { useMetadataModels } from '@/_hooks/use-metadata-models';
import MetadataValueDisplay from './metadata-value-display';
import { Alert, AlertDescription } from '@repo/ui/alert';
import Link from 'next/link';
import { typoVariants } from '@repo/ui/typo';
import { ImagePreview } from '@repo/ui/image-preview';
import OrganizationEditLogoDrawer from './organization-edit-logo-drawer';
import useOrganization from '@/_hooks/use-organization';
import { AlertDialog } from '@repo/ui/alert-dialog';
import OrganizationEditDrawer from './organization-edit-drawer';
import { useUsers } from '@/_hooks/use-users';
import UsersDataTable from './users-data-table';
import { ButtonIcon } from '@repo/ui/button-icon';
import { PlusIcon } from 'lucide-react';
import NewUserDialog from './new-user-dialog';

type Props = {
  trigger?: React.ReactNode;
  organization: Organization;
};

export default function OrganizationInfoDrawer({
  organization,
  trigger,
  ...props
}: Props & React.ComponentProps<typeof Drawer>) {
  const { metadataModels } = useMetadataModels('Organization');
  const { deleteOrganizationLogo, handlingOrganization } = useOrganization();
  const { users, isLoadingUsers } = useUsers({
    executeQuery: !!organization,
    filters: { organizationId: organization?.id },
  });

  async function handleDeleteLogo() {
    await deleteOrganizationLogo(organization.id);
  }

  return (
    <Drawer {...props}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-1.5">
            <div className="flex flex-col justify-center max-w-[17.625rem]">
              <div className="truncate">{organization?.name || '-'}</div>
            </div>
            <Badge
              variant={organization?.active ? 'success' : 'destructive'}
              size={'md'}
              className="cursor-text"
            >
              {organization?.active ? 'Active' : 'Inactive'}
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
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2">
                    <ImagePreview
                      src={organization?.logo}
                      className="min-w-60 w-full h-32"
                    >
                      {!organization?.logo && 'No Logo'}
                    </ImagePreview>
                    <div className="flex gap-1 items-center">
                      <OrganizationEditLogoDrawer
                        organization={organization}
                        trigger={
                          <Button
                            variant="outline"
                            size="xs"
                            disabled={handlingOrganization === 'deleting-logo'}
                          >
                            {organization?.logo ? 'Change Logo' : 'Upload Logo'}
                          </Button>
                        }
                      />
                      {organization?.logo && (
                        <AlertDialog
                          title="Delete Logo"
                          description="Are you sure you want to delete the logo? No worries, you can always upload a new one later."
                          idleLabel="Yes, delete"
                          actingLabel="Deleting..."
                          variant="destructive"
                          onClick={handleDeleteLogo}
                          isActing={handlingOrganization === 'deleting-logo'}
                          trigger={
                            <Button variant="outline-destructive" size="xs">
                              Delete Logo
                            </Button>
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <BoxKeyValue
                      label="Domains"
                      value={
                        organization?.domains.length > 0 ? (
                          organization?.domains.map(({ domain }) => (
                            <Badge
                              key={domain}
                              variant={'outline'}
                              size={'sm'}
                              className="cursor-text"
                            >
                              {domain}
                            </Badge>
                          ))
                        ) : (
                          <Badge
                            variant={'outline'}
                            size={'sm'}
                            className="cursor-text"
                          >
                            No domains registered
                          </Badge>
                        )
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <BoxKeyValue
                        label="Created At"
                        value={organization?.createdAt}
                        date
                      />
                      <BoxKeyValue
                        label="Updated At"
                        value={organization?.updatedAt}
                        date
                      />
                    </div>
                  </div>
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
                      metadataValues={organization?.metadata}
                    />
                  </div>
                ) : (
                  <Alert variant="info" size={'sm'}>
                    <AlertDescription>
                      No metadata models found.{' '}
                      <Link
                        href={`/${organization?.environmentId}/metadata/models`}
                        className={typoVariants({ variant: 'link' })}
                      >
                        Create a metadata model
                      </Link>{' '}
                      to start adding custom fields to your organizations.
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
                    label="OID (Organization ID)"
                    value={organization?.id}
                    withCopy
                  />
                </div>
              </section>

              <section>
                <header className="flex flex-col gap-0.5 mb-2">
                  <Typo variant="lg" className="flex items-center gap-1">
                    Users
                  </Typo>
                </header>
                <UsersDataTable
                  users={users}
                  hideFields={['organization']}
                  loading={isLoadingUsers}
                  actions={
                    <NewUserDialog
                      trigger={
                        <ButtonIcon
                          variant="outline"
                          icon={PlusIcon}
                          size="sm"
                        />
                      }
                      organization={organization as Organization}
                    />
                  }
                />
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
          <OrganizationEditDrawer
            organization={organization}
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
