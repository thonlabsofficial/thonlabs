import { labsAPI } from '../../helpers/api';
import {
  NewEnvironmentFormData,
  UpdateEnvironmentAuthSettingsFormData,
  UpdateEnvironmentGeneralSettingsFormData,
} from '../_validators/environments-validators';
import { useToast } from '@repo/ui/hooks/use-toast';
import { Environment, EnvironmentDetail } from '@/_interfaces/environment';
import { APIErrors } from '@helpers/api/api-errors';
import useSWR from 'swr';
import React from 'react';
import { Project } from '../_interfaces/project';
import useOptimisticUpdate from './use-optimistic-update';
import { useEnvironmentData } from '@/_libs/_nextjs';
import { buildEnvDataMutation } from './use-environment-app-data';

type Params = {
  environmentId?: string;
};

type Options = {
  onFetchComplete?: (environment: EnvironmentDetail) => void;
};

export default function useEnvironment(
  params: Params = {},
  { onFetchComplete }: Options = {},
) {
  const {
    data: environment,
    isLoading: isLoadingEnvironment,
    isValidating: isValidatingEnvironment,
    error: environmentError,
  } = useSWR<EnvironmentDetail>(
    () => params.environmentId && `/environments/${params.environmentId}`,
  );
  const environmentData = useEnvironmentData();

  const { toast } = useToast();
  const { makeMutations } = useOptimisticUpdate();

  const environmentMemo = React.useMemo(() => {
    if (!environment || !environmentData) {
      return null;
    }

    return { ...environment, ...environmentData } as EnvironmentDetail;
  }, [environment, environmentData]);

  React.useEffect(() => {
    environmentMemo && onFetchComplete?.(environmentMemo);
  }, [environmentMemo]);

  async function createEnvironment(
    projectId: string,
    payload: NewEnvironmentFormData,
  ) {
    try {
      const { data } = await labsAPI.post<Environment>('/environments', {
        ...payload,
        projectId,
      });

      toast({
        title: 'Welcome to your environment',
        description: `The ${payload.name} has been successfully created.`,
      });

      return data;
    } catch (error: any) {
      console.error('useEnvironment.createEnvironment', error);
      toast({
        title: "We couldn't create your environment",
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  async function updateEnvironmentGeneralSettings(
    environmentId: string,
    payload: UpdateEnvironmentGeneralSettingsFormData,
  ) {
    try {
      await labsAPI.patch<Environment>(
        `/environments/${environmentId}/general-settings`,
        payload,
      );

      /*
        Updates the cache of get and projects list with the new environment data
      */
      makeMutations([
        {
          cacheKey: `/environments/${environmentId}`,
          populateCache: (_, environment) => ({
            ...environment,
            ...payload,
          }),
        },
        {
          cacheKey: '/projects',
          populateCache: (_, projects) => ({
            ...projects,
            items: (projects?.items || []).map(
              (project: Project & { environments: Environment[] }) => ({
                ...project,
                environments: project.environments.map((e: Environment) =>
                  e.id === environmentId ? { ...e, ...payload } : e,
                ),
              }),
            ),
          }),
        },
      ]);

      toast({
        title: 'Changes Saved',
        description: 'The general settings has been successfully updated.',
      });

      return Promise.resolve();
    } catch (error: any) {
      console.error('useEnvironment.updateEnvironmentGeneralSettings', error);
      toast({
        title: 'Update Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });

      return Promise.reject(error);
    }
  }

  async function updateEnvironmentAuthSettings(
    environmentId: string,
    payload: UpdateEnvironmentAuthSettingsFormData,
  ) {
    try {
      await labsAPI.patch<Environment>(
        `/environments/${environmentId}/auth-settings`,
        payload,
      );

      makeMutations(
        buildEnvDataMutation([
          {
            environmentId,
            key: 'authProvider',
            value: payload.authProvider,
            isSDKData: true,
          },
          {
            environmentId,
            key: 'enableSignUp',
            value: payload.enableSignUp,
            isSDKData: true,
          },
          {
            environmentId,
            key: 'enableSignUpB2BOnly',
            value: payload.enableSignUpB2BOnly,
            isSDKData: true,
          },
        ]),
      );

      toast({
        title: 'Changes Saved',
        description: 'The auth settings has been successfully updated.',
      });

      return Promise.resolve();
    } catch (error: any) {
      console.error('useEnvironment.updateEnvironmentAuthSettings', error);
      toast({
        title: 'Update Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });

      return Promise.reject(error);
    }
  }

  async function regenerateEnvironmentPublicKey(environmentId: string) {
    try {
      const { data } = await labsAPI.patch<{ publicKey: string }>(
        `/environments/${environmentId}/public`,
      );

      makeMutations([
        {
          cacheKey: `/environments/${environmentId}`,
          populateCache: (_, environment) => ({
            ...environment,
            publicKey: data.publicKey,
          }),
        },
      ]);

      return Promise.resolve();
    } catch (error: any) {
      console.error('useEnvironment.regenerateEnvironmentPublicKey', error);
      toast({
        title: 'Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });

      return Promise.reject(error);
    }
  }

  async function regenerateEnvironmentSecretKey(environmentId: string) {
    try {
      const { data } = await labsAPI.patch<{ secretKey: string }>(
        `/environments/${environmentId}/secret`,
      );

      makeMutations([
        {
          cacheKey: `/environments/${environmentId}`,
          populateCache: (_, environment) => ({
            ...environment,
            secretKey: data.secretKey,
          }),
        },
      ]);

      return Promise.resolve(data.secretKey);
    } catch (error: any) {
      console.error('useEnvironment.regenerateEnvironmentSecretKey', error);
      toast({
        title: 'Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });

      return Promise.reject(error);
    }
  }

  async function getEnvironmentSecretKey(environmentId: string) {
    const { data } = await labsAPI.get<{ secretKey: string }>(
      `/environments/${environmentId}/secret`,
    );

    return data.secretKey;
  }

  async function deleteEnvironment(environment: EnvironmentDetail) {
    try {
      await labsAPI.delete(`/environments/${environment.id}`);

      makeMutations([
        {
          cacheKey: `/projects`,
          populateCache: (_, projects) => ({
            ...projects,
            items: projects.items.map(
              (p: Project & { environments: Environment[] }) =>
                p.id === environment.projectId
                  ? {
                      ...p,
                      environments: p.environments.filter(
                        (e) => e.id !== environment.id,
                      ),
                    }
                  : p,
            ),
          }),
        },
      ]);

      toast({
        title: 'Environment Deleted',
        description: `Your environment ${environment.name} has been successfully deleted.`,
      });
    } catch (error: any) {
      console.error('useEnvironment.deleteEnvironment', error);
      toast({
        title: 'Deleting Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function setCustomDomain(environmentId: string, customDomain: string) {
    try {
      const { data } = await labsAPI.patch(
        `/environments/${environmentId}/domains`,
        {
          customDomain,
        },
      );

      makeMutations([
        {
          cacheKey: `/environments/${environmentId}`,
          populateCache: (_, environment) => ({
            ...environment,
            ...data,
          }),
        },
      ]);

      toast({
        title: 'Custom Domain Set',
        description: 'Your custom domain has been successfully set.',
      });
    } catch (error: any) {
      console.error('useEnvironment.setCustomDomain', error);
      toast({
        title: 'Set Custom Domain Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
      throw error;
    }
  }

  async function deleteCustomDomain(environmentId: string) {
    try {
      await labsAPI.delete(`/environments/${environmentId}/domains`);

      makeMutations([
        {
          cacheKey: `/environments/${environmentId}`,
          populateCache: (_, environment) => ({
            ...environment,
            customDomain: null,
            customDomainStatus: null,
            customDomainStartValidationAt: null,
            customDomainLastValidationAt: null,
          }),
        },
      ]);

      toast({
        title: 'Custom Domain Deleted',
        description: 'Your custom domain has been successfully deleted.',
      });
    } catch (error: any) {
      console.error('useEnvironment.deleteCustomDomain', error);
      toast({
        title: 'Deleting Custom Domain Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  async function verifyCustomDomain(environmentId: string) {
    try {
      const { data } = await labsAPI.post(
        `/environments/${environmentId}/domains/verify`,
      );

      makeMutations([
        {
          cacheKey: `/environments/${environmentId}`,
          populateCache: (_, environment) => ({
            ...environment,
            ...data,
          }),
        },
      ]);
    } catch (error: any) {
      console.error('useEnvironment.verifyCustomDomain', error);
      toast({
        title: 'Verify Custom Domain Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  async function reverifyCustomDomain(environmentId: string) {
    try {
      const { data } = await labsAPI.post(
        `/environments/${environmentId}/domains/reverify`,
      );

      makeMutations([
        {
          cacheKey: `/environments/${environmentId}`,
          populateCache: (_, environment) => ({
            ...environment,
            customDomainStatus: data.customDomainStatus,
            customDomainTXTStatus: data.customDomainTXTStatus,
          }),
        },
      ]);
    } catch (error: any) {
      console.error('useEnvironment.reverifyCustomDomain', error);
    }
  }

  return {
    environment: environmentMemo as EnvironmentDetail,
    isLoadingEnvironment,
    isValidatingEnvironment,
    environmentError,
    createEnvironment,
    updateEnvironmentGeneralSettings,
    updateEnvironmentAuthSettings,
    regenerateEnvironmentPublicKey,
    regenerateEnvironmentSecretKey,
    getEnvironmentSecretKey,
    deleteEnvironment,
    deleteCustomDomain,
    setCustomDomain,
    verifyCustomDomain,
    reverifyCustomDomain,
  };
}
