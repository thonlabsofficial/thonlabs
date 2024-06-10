import useSWR from 'swr';

interface ProjectsResponse {
  items: {
    id: string;
    appName: string;
    environments: {
      id: string;
      name: string;
      appURL: string;
    }[];
  }[];
}

export function useProjects() {
  const { data, error, isLoading } = useSWR<ProjectsResponse>('/projects');

  return {
    projects: data?.items || [],
    projectsError: error,
    isLoadingProjects: isLoading,
  };
}
