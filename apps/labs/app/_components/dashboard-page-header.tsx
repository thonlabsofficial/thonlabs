'use client';

import { Badge } from '@repo/ui/badge';
import { LayoutDashboard } from 'lucide-react';
import { useEnvironmentAppData } from '@/_hooks/use-environment-app-data';
import PageHeader from './page-header';

export default function DashboardPageHeader() {
  const { environmentName, appName, sdkIntegrated } = useEnvironmentAppData();

  return (
    <PageHeader
      title='Dashboard'
      description={
        <div className='flex items-center gap-2'>
          {appName} · {environmentName}
          {sdkIntegrated ? (
            <Badge variant='success' className='text-white'>
              Integrated
            </Badge>
          ) : (
            <Badge variant='destructive' className='text-white'>
              Integration pending
            </Badge>
          )}
          <Badge variant='info' className='text-white'>
            Free Plan
          </Badge>
        </div>
      }
      icon={LayoutDashboard}
    />
  );
}
