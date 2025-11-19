import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { Database } from 'lucide-react';
import MetadataModelCreateDialog from '@/_components/metadata-model-create-dialog';
import MetadataModelDataTable from '@/_components/metadata-model-data-table';
import { fetchMetadata } from '@/_services/metadata-service';
import { Button } from '@repo/ui/button';

export const metadata: Metadata = {
  title: 'Metadata Models',
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
        title="Metadata Models"
        description="Create data structures to be applied to users, organizations, or environments"
        icon={Database}
        actions={
          <MetadataModelCreateDialog
            trigger={<Button>New Metadata Model</Button>}
          />
        }
      />
      <PageWrapper>
        <MetadataModelDataTable metadata={metadataList} />
      </PageWrapper>
    </>
  );
}
