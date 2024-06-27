import React from 'react';

export default function PageWrapper({
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return <div className="pl-64">{children}</div>;
}
