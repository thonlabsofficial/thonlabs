'use client';

import React from 'react';
import UsersDataTable from './users-datatable';
import { useUsers } from '@/_hooks/use-users';

export default function UsersList() {
  const { users, isLoadingUsers } = useUsers();

  return <UsersDataTable users={users} loading={isLoadingUsers} />;
}
