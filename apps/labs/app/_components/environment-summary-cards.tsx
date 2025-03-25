import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card';
import { Typo } from '@repo/ui/typo';

interface EnvironmentSummaryCardProps {
  title: string;
  value: number;
}

function EnvironmentSummaryCard({ title, value }: EnvironmentSummaryCardProps) {
  return (
    <Card padding>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Typo variant="h2">{value}</Typo>
      </CardContent>
    </Card>
  );
}

export default function EnvironmentSummaryCards() {
  const monthName = new Date(0, new Date().getMonth()).toLocaleString(
    'default',
    {
      month: 'long',
    },
  );

  return (
    <div className="grid grid-cols-4 gap-3">
      <EnvironmentSummaryCard title="Total Users" value={100} />
      <EnvironmentSummaryCard title="Monthly Active Users" value={100} />
      <EnvironmentSummaryCard title={`${monthName} Signups`} value={100} />
      <EnvironmentSummaryCard title="Total Organizations" value={100} />
    </div>
  );
}
