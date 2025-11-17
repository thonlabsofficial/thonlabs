import { envHeaders, labsEnvAPI } from '@helpers/api';
import { useToast } from '@repo/ui/hooks/use-toast';
import { APIErrors } from '@helpers/api/api-errors';
import {
  CreateMetadataFormData,
  UpdateMetadataFormData,
} from '@/_validators/metadata-validators';
import { Metadata } from '@/_interfaces/metadata';
import useUserSession from '@/_hooks/use-user-session';
import { revalidateCache } from '@/_services/server-cache-service';

export default function useMetadata() {
  const { environment } = useUserSession();
  const { toast } = useToast();

  async function createMetadata(payload: CreateMetadataFormData) {
    try {
      const { data: metadata } = await labsEnvAPI.post<Metadata>(
        `/metadata/models`,
        payload,
        envHeaders(environment.id),
      );

      toast({
        title: 'Metadata Created',
        description: `${metadata.name} has been created successfully`,
      });

      await revalidateCache([`/${environment.id}/metadata`]);

      return metadata;
    } catch (error: any) {
      console.error('useMetadata.createMetadata', error);
      toast({
        title: 'Creating Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function updateMetadata(
    metadataId: string,
    payload: UpdateMetadataFormData,
  ) {
    try {
      const { data } = await labsEnvAPI.put<Metadata>(
        `/metadata/models/${metadataId}`,
        payload,
        envHeaders(environment.id),
      );

      toast({
        title: 'Changes Saved',
        description: `${data.name} has been updated successfully`,
      });

      await revalidateCache([`/${environment.id}/metadata`]);

      return data;
    } catch (error: any) {
      console.error('useMetadata.updateMetadata', error);
      toast({
        title: 'Updating Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function deleteMetadata(metadataId: string) {
    try {
      const { data } = await labsEnvAPI.delete<Metadata>(
        `/metadata/models/${metadataId}`,
        envHeaders(environment.id),
      );

      toast({
        title: 'Metadata Deleted',
        description: `${data.name} has been deleted successfully`,
      });

      await revalidateCache([`/${environment.id}/metadata`]);

      return data;
    } catch (error: any) {
      console.error('useMetadata.deleteMetadata', error);
      toast({
        title: 'Delete Metadata Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  return {
    createMetadata,
    updateMetadata,
    deleteMetadata,
  };
}
