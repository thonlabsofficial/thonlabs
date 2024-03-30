'use client';

import { labsAPI } from '@/helpers/api';
import { Typo } from '@/ui/components/ui/typo';
import { Metadata } from 'next';
import React from 'react';

// export const metadata: Metadata = {
//   title: {
//     absolute: 'Thon Labs',
//   },
// };

export default function Home() {
  React.useEffect(() => {
    setTimeout(() => {
      console.log('get projects');

      labsAPI.get('/projects');
    }, 10000);
  }, []);
  return (
    <Typo variant={'h1'} className="text-primary">
      Portal - Thon Labs!
    </Typo>
  );
}
