'use client';

import React from 'react';
import ToasterObservable from './toaster-observable';

export default function ToasterObservableWrapper() {
  return (
    <React.Suspense>
      <ToasterObservable />
    </React.Suspense>
  );
}
