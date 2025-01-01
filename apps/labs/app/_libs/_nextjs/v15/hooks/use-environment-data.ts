import React from 'react';
import { ThonLabsSessionContext } from '../core/thonlabs-session-provider';
import { EnvironmentData } from '../../shared/interfaces/environment-data';

export function useEnvironmentData() {
  const { environmentData } = React.useContext(ThonLabsSessionContext);

  return environmentData as EnvironmentData;
}
