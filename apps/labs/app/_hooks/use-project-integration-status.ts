import useSWR from 'swr';
import { useEnvironmentAppData } from './use-environment-app-data';

interface ProjectIntegrationStatusResponse {
  status: 'notInitialized' | 'partialCompleted' | 'completed';
}

export function useProjectIntegrationStatus() {
  const { projectId } = useEnvironmentAppData();
  const { data, error, isLoading } = useSWR<ProjectIntegrationStatusResponse>(
    `/projects/${projectId}/integration-status`,
  );

  return {
    projectIntegrationStatus: data?.status,
    projectIntegrationStatusError: error,
    isLoadingProjectIntegrationStatus: isLoading,
  };
}
