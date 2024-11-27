'use client';

import { DataTable } from '@repo/ui/data-table';
import { Button } from '@repo/ui/button';
import React from 'react';
import NewOrganizationDialog from '@/_components/new-organization-dialog';

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
          <NewOrganizationDialog
            trigger={<Button size={'sm'}>New Organization</Button>}
          />
        }
      />
    </>
  );
}
