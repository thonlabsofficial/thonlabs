import React from 'react';
import { ThonLabsSessionContext } from '../core/thonlabs-session-provider';

export function useSession() {
  const { user } = React.useContext(ThonLabsSessionContext);

  return {
    user,
  };
}
