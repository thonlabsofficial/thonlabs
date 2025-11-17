import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { Database } from 'lucide-react';
import MetadataCreateDialog from '@/_components/metadata-create-dialog';
import MetadataDataTable from '@/_components/metadata-data-table';
import { fetchMetadata } from '@/_services/metadata-service';
import { Button } from '@repo/ui/button';

export const metadata: Metadata = {
  title: 'Metadata',
};

export default async function MetadataPage({
  params,
}: {
  params: Promise<{ environmentId: string }>;
}) {
  const { environmentId } = await params;
  const { items: metadataList } = await fetchMetadata(environmentId);

  return (
    <>
      <PageHeader
        title="Metadata"
        icon={Database}
        actions={
          <MetadataCreateDialog trigger={<Button>New Metadata</Button>} />
        }
      />
      <PageWrapper>
        <MetadataDataTable metadata={metadataList} />
      </PageWrapper>
    </>
  );
}
