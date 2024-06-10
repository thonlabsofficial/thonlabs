import React from 'react';
import { SessionContext } from '../_providers/session-provider';

export default function useSession() {
  const { user } = React.useContext(SessionContext);

  return {
    user,
  };
}
