'use server';

import { serverLabsEnvAPI } from '@helpers/api/server';
import type { Environment } from '@/_interfaces/environment';
import type { Project } from '@/_interfaces/project';

interface ProjectsResponse {
  items: Project &
    {
      environments: Environment[];
    }[];
}

export async function fetchProjects() {
  const { data } = await serverLabsEnvAPI.get<ProjectsResponse>(`/projects`);

  console.log(data.items);

  return data?.items || [];
}
