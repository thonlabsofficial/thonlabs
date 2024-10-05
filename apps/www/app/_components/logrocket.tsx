'use client';

import React from 'react';
import logRocket from 'logrocket';

export default function LogRocket() {
  React.useEffect(() => {
    logRocket.init('ppdhoa/thonlabs');
    logRocket.identify('');
  }, []);

  return <></>;
}
