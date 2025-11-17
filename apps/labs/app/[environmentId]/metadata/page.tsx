import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { SquareUser } from 'lucide-react';
import NewUserDialog from '@/_components/new-user-dialog';
import { Button } from '@repo/ui/button';

export const metadata: Metadata = {
  title: 'Metadata',
};

export default async function Users({
  params,
}: {
  params: Promise<{ environmentId: string }>;
}) {
  const { environmentId } = await params;

  return (
    <>
      <PageHeader
        title="Metadata"
        icon={SquareUser}
        actions={<NewUserDialog trigger={<Button>New Metadata</Button>} />}
      />
      <PageWrapper>{/* TODO: @cursor start here */}</PageWrapper>
    </>
  );
}
