import { labsAPI } from '../../../helpers/api';
import {
  NewEnvironmentFormData,
  UpdateEnvironmentAuthSettingsFormData,
  UpdateEnvironmentGeneralSettingsFormData,
} from '../_validators/environments-validators';
import { useToast } from '@repo/ui/hooks/use-toast';
import { Environment } from '@/(labs)/_interfaces/environment';
import { APIErrors } from '@helpers/api/api-errors';
import useSWR from 'swr';
import React from 'react';
import { Project } from '../_interfaces/project';
import useOptimisticUpdate from './use-optmistic-update';

type Params = {
  environmentID?: string;
};

type Options = {
  onFetchComplete?: () => void;
};

export default function useEnvironment(
  params: Params = {},
  { onFetchComplete }: Options = {},
) {
  const {
    data: environment,
    isLoading: isLoadingEnvironment,
    error: environmentError,
  } = useSWR(
    () => params.environmentID && `/environments/${params.environmentID}`,
  );
  const { toast } = useToast();
  const { makeMutations } = useOptimisticUpdate();

  React.useEffect(() => {
    onFetchComplete && onFetchComplete();
  }, [environment]);

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
    environmentID: string,
    payload: UpdateEnvironmentGeneralSettingsFormData,
  ) {
    try {
      await labsAPI.patch<Environment>(
        `/environments/${environmentID}/general-settings`,
        payload,
      );

      /*
        Updates the cache of get and projects list with the new environment data
      */
      makeMutations([
        {
          cacheKey: `/environments/${environmentID}`,
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
                  e.id === environmentID ? { ...e, ...payload } : e,
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
    environmentID: string,
    payload: UpdateEnvironmentAuthSettingsFormData,
  ) {
    try {
      await labsAPI.patch<Environment>(
        `/environments/${environmentID}/auth-settings`,
        payload,
      );

      /*
        Updates the cache of get and projects list with the new environment data
      */
      makeMutations([
        {
          cacheKey: `/environments/${environmentID}`,
          populateCache: (_, environment) => ({
            ...environment,
            ...payload,
          }),
        },
      ]);

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

  return {
    environment,
    isLoadingEnvironment,
    environmentError,
    createEnvironment,
    updateEnvironmentGeneralSettings,
    updateEnvironmentAuthSettings,
  };
}
