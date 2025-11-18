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

export default function useMetadataModel() {
  const { environment } = useUserSession();
  const { toast } = useToast();

  async function createMetadataModel(payload: CreateMetadataFormData) {
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
      console.error('useMetadataModel.createMetadataModel', error);
      toast({
        title: 'Creating Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function updateMetadataModel(
    metadataId: string,
    payload: Omit<UpdateMetadataFormData, 'key' | 'type' | 'context'>,
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
      console.error('useMetadataModel.updateMetadataModel', error);
      toast({
        title: 'Updating Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function deleteMetadataModel(metadataId: string) {
    try {
      await labsEnvAPI.delete<Metadata>(
        `/metadata/models/${metadataId}`,
        envHeaders(environment.id),
      );

      toast({
        title: 'Metadata Model Deleted',
        description: 'The metadata model has been deleted successfully',
      });

      await revalidateCache([`/${environment.id}/metadata`]);
    } catch (error: any) {
      console.error('useMetadataModel.deleteMetadataModel', error);
      toast({
        title: 'Delete Metadata Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  return {
    createMetadataModel,
    updateMetadataModel,
    deleteMetadataModel,
  };
}
