import { labsAPI } from '@helpers/api';
import { APIErrors } from '@helpers/api/api-errors';
import { useToast } from '@repo/ui/hooks/use-toast';
import { useParams } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';
import type {
  Organization,
  OrganizationDetail,
} from '@/_interfaces/organization';
import { revalidateCache } from '@/_services/server-cache-service';
import type {
  EditOrganizationFormData,
  NewOrganizationFormData,
  UpdateLogoOrganizationFormData,
} from '@/_validators/organizations-validators';

interface Params {
  organizationId?: string;
}

export default function useOrganization(params: Params = {}) {
  const { toast } = useToast();
  const { environmentId } = useParams();
  const {
    data: organizationData,
    isLoading: isLoadingOrganization,
    isValidating: isValidatingOrganization,
    error: organizationError,
  } = useSWR<OrganizationDetail>(
    () => params.organizationId && `/organizations/${params.organizationId}`
  );

  const organization = React.useMemo(() => {
    if (!organizationData) {
      return null;
    }

    return organizationData;
  }, [organizationData]);

  async function createOrganization({
    logo,
    ...payload
  }: NewOrganizationFormData) {
    try {
      const { data } = await labsAPI.post<Organization>(
        '/organizations',
        payload
      );

      if (logo?.[0]) {
        await updateOrganizationLogo(data.id, { logo }, false);
      }

      toast({
        title: 'Organization Created',
        description: `Your organization ${payload.name} has been successfully created.`,
      });

      await revalidateCache([`/${environmentId}/organizations`]);

      return data;
    } catch (error: any) {
      console.error('useOrganization.createOrganization', error);
      toast({
        title: 'Creating Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function updateOrganization(
    organizationId: string,
    payload: EditOrganizationFormData
  ) {
    try {
      const { data } = await labsAPI.patch<Organization>(
        `/organizations/${organizationId}`,
        payload
      );

      toast({
        title: 'Organization Updated',
        description: `Your organization ${payload.name} has been successfully updated.`,
      });

      await revalidateCache([
        `/${environmentId}/organizations`,
        `/${environmentId}/organizations/${organizationId}`,
      ]);

      return data;
    } catch (error: any) {
      console.error('useOrganization.updateOrganization', error);
      toast({
        title: 'Updating Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function updateOrganizationLogo(
    organizationId: string,
    payload: UpdateLogoOrganizationFormData,
    showNotification = true
  ) {
    try {
      await labsAPI.patch<Organization>(
        `/organizations/${organizationId}/logo`,
        { file: payload.logo?.[0] },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      await revalidateCache([
        `/${environmentId}/organizations/${organizationId}`,
      ]);

      if (showNotification) {
        toast({
          title: 'Organization Logo Changed',
          description: 'The logo has been successfully changed.',
        });
      }
    } catch (error: any) {
      console.error('useOrganization.updateLogo', error);
      if (showNotification) {
        toast({
          title: 'Error',
          description: error?.response?.data?.message || APIErrors.GenericFile,
          variant: 'destructive',
        });
      }
      throw error;
    }
  }

  async function deleteOrganizationLogo(organizationId: string) {
    try {
      toast({
        description: 'Deleting logo...',
      });

      await labsAPI.delete(`/organizations/${organizationId}/logo`);

      await revalidateCache([
        `/${environmentId}/organizations`,
        `/${environmentId}/organizations/${organizationId}`,
      ]);

      toast({
        title: 'Organization Logo Deleted',
        description: 'The logo has been successfully deleted.',
      });
    } catch (error: any) {
      console.error('useOrganization.deleteLogo', error);
      toast({
        title: 'Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function deleteOrganization(organizationId: string) {
    try {
      await labsAPI.delete(`/organizations/${organizationId}`);
      await revalidateCache([`/${environmentId}/organizations`]);

      toast({
        title: 'Organization Deleted',
        description: 'The organization has been successfully deleted.',
      });
    } catch (error: any) {
      console.error('useOrganization.deleteOrganization', error);
      toast({
        title: 'Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function updateOrganizationStatus(
    organizationId: string,
    payload: { active: boolean }
  ) {
    try {
      await labsAPI.patch(`/organizations/${organizationId}/status`, payload);

      await revalidateCache([
        `/${environmentId}/organizations`,
        `/${environmentId}/organizations/${organizationId}`,
      ]);

      toast({
        title: 'Organization Status Updated',
        description: `The organization status has been successfully updated.`,
      });
    } catch (error: any) {
      console.error('useOrganization.updateOrganizationStatus', error);
      toast({
        title: 'Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
      throw error;
    }
  }

  return {
    createOrganization,
    updateOrganizationLogo,
    updateOrganization,
    deleteOrganizationLogo,
    deleteOrganization,
    updateOrganizationStatus,
    organization,
    isLoadingOrganization,
    isValidatingOrganization,
    organizationError,
  };
}
