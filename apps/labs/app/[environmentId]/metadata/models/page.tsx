import { Metadata } from 'next';
import PageWrapper from '@/_components/page-wrapper';
import PageHeader from '@/_components/page-header';
import { Database, PlusIcon, Globe } from 'lucide-react';
import MetadataModelCreateDialog from '@/_components/metadata-model-create-dialog';
import MetadataModelDataTable from '@/_components/metadata-model-data-table';
import { fetchMetadata } from '@/_services/metadata-service';
import { ButtonIcon } from '@repo/ui/button-icon';
import EnvironmentMetadataDrawer from '@/_components/environment-metadata-drawer';
import { getEnvironmentById } from '@/_services/environment-service';

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
  const environment = await getEnvironmentById(environmentId);

  return (
    <>
      <PageHeader
        title="Metadata Models"
        description="Create data structures to be applied dynamically to users, organizations, or environments"
        icon={Database}
      />
      <PageWrapper>
        <MetadataModelDataTable
          metadata={metadataList}
          actions={
            <>
              <EnvironmentMetadataDrawer
                environment={environment}
                trigger={
                  <ButtonIcon
                    variant="outline"
                    icon={Globe}
                    title="Global Metadata"
                  />
                }
              />
              <MetadataModelCreateDialog
                trigger={<ButtonIcon variant="outline" icon={PlusIcon} />}
              />
            </>
          }
        />
      </PageWrapper>
    </>
  );
}
