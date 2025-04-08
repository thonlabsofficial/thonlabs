'use client';

import { useEnvironmentAppData } from '@/_hooks/use-environment-app-data';
import { Badge } from '@repo/ui/badge';
import { Typo } from '@repo/ui/typo';

export default function DashboardPageHeader() {
  const { environmentName, appName, sdkIntegrated } = useEnvironmentAppData();

  return (
    <header className="flex items-center gap-2">
      <Typo variant="h2" className="font-medium">
        {appName} · {environmentName}
      </Typo>
      <Badge variant="info">Free Plan</Badge>
      {sdkIntegrated && <Badge variant="success">Integrated</Badge>}
    </header>
  );
}
