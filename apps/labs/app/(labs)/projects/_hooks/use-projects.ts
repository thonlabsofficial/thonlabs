import { Environment } from '@/(labs)/_interfaces/environment';
import { Project } from '@/(labs)/_interfaces/project';
import useSWR from 'swr';

interface ProjectsResponse {
  items: (Project & {
    environments: Environment[];
  })[];
}

export function useProjects() {
  const { data, error, isLoading } = useSWR<ProjectsResponse>('/projects');

  return {
    projects: data?.items || [],
    projectsError: error,
    isLoadingProjects: isLoading,
  };
}
