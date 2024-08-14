'use client';

import { useUsers } from '@labs/users/_hooks/use-users';

export default function UsersList() {
  const { users, isLoadingUsers } = useUsers();

  console.log(users);

  return (
    <>
      {isLoadingUsers ? (
        'Loading...'
      ) : (
        <ul>
          {users && users.map((user) => <li key={user.id}>{user.fullName}</li>)}
        </ul>
      )}
    </>
  );
}
