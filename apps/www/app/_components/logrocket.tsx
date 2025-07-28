'use client';

import logRocket from 'logrocket';
import React from 'react';

export default function LogRocket() {
  React.useEffect(() => {
    logRocket.init('ppdhoa/thonlabs');
    logRocket.identify('');
  }, []);

  return <></>;
}
