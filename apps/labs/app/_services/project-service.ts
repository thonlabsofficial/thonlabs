'use server';

import { Environment } from '@/_interfaces/environment';
import { Project } from '@/_interfaces/project';
import { serverLabsEnvAPI } from '@helpers/api/server';

interface ProjectsResponse {
  items: Project &
    {
      environments: Environment[];
    }[];
}

export async function fetchProjects() {
  const { data } = await serverLabsEnvAPI.get<ProjectsResponse>(`/projects`);

  return data?.items || [];
}
