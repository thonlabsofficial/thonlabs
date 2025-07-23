'use server';

import { Project } from '@/_interfaces/project';
import { serverLabsEnvAPI } from '@helpers/api/server';

interface ProjectsResponse {
  items: Project[];
}

export async function fetchProjects() {
  const { data } = await serverLabsEnvAPI.get<ProjectsResponse>(`/projects`);

  console.log(data.items);

  return data?.items || [];
}
