'use client';

import { DataTable } from '@repo/ui/data-table';
import { Button } from '@repo/ui/button';
import React from 'react';
import NewOrganizationDrawer from '@/_components/new-organization-drawer';

export default function OrganizationsList() {
  return (
    <>
      <DataTable
        loading={false}
        columns={[]}
        data={[]}
        defaultSorting={[{ id: 'name', desc: false }]}
        searchFields={['id', 'name']}
        noResultsMessage="No organizations found"
        searchPlaceholder="Search by name..."
        actions={
          <NewOrganizationDrawer
            trigger={<Button size={'sm'}>New Organization</Button>}
          />
        }
      />
    </>
  );
}
