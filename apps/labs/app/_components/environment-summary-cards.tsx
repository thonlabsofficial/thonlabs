import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';
import { getDashboardSummary } from '@/_services/dashboard-service';

interface EnvironmentSummaryCardProps {
  title: string;
  value: string;
}

function EnvironmentSummaryCard({ title, value }: EnvironmentSummaryCardProps) {
  return (
    <Card padding>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Typo variant='h2'>{value}</Typo>
      </CardContent>
    </Card>
  );
}

interface Props {
  environmentId: string;
}

export default async function EnvironmentSummaryCards({
  environmentId,
}: Props) {
  const data = await getDashboardSummary(environmentId);
  const monthName = new Date(0, new Date().getMonth()).toLocaleString(
    'default',
    {
      month: 'long',
    }
  );

  return (
    <div className='grid grid-cols-4 gap-3'>
      <EnvironmentSummaryCard
        title='Total Active Users'
        value={data.totalActiveUsers?.toString() || '-'}
      />
      <EnvironmentSummaryCard
        title='Monthly Active Users'
        value={data.monthlyActiveUsers?.toString() || '-'}
      />
      <EnvironmentSummaryCard
        title={`${monthName} Signups`}
        value={data.currentMonthSignUps?.toString() || '-'}
      />
      <EnvironmentSummaryCard
        title='Total Organizations'
        value={data.totalActiveOrganizations?.toString() || '-'}
      />
    </div>
  );
}
