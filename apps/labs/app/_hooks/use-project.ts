import { APIErrors } from '@helpers/api/api-errors';
import { useToast } from '@repo/ui/hooks/use-toast';
import { useSWRConfig } from 'swr';
import type { Environment } from '@/_interfaces/environment';
import type { Project } from '@/_interfaces/project';
import { labsAPI } from '../../helpers/api';
import type {
  NewProjectFormData,
  UpdateProjectGeneralInfoFormData,
} from '../_validators/projects-validators';

export default function useProject() {
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  async function createProject(
    payload: NewProjectFormData,
    withNotification = true
  ) {
    try {
      const { data } = await labsAPI.post<
        Project & { environment: Environment }
      >('/projects', payload);

      if (withNotification) {
        toast({
          title: 'This is a beginning of something!',
          description: `Your project ${payload.appName} has been successfully created.`,
        });
      }

      return data;
    } catch (error: any) {
      console.error('[Create Project]', error);
      toast({
        title: 'Creating Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
    }
  }

  async function updateGeneralInfo(
    projectID: string,
    payload: UpdateProjectGeneralInfoFormData
  ) {
    try {
      await mutate(
        '/projects',
        labsAPI.patch<Project>(`/projects/${projectID}`, payload),
        {
          populateCache: ({ data }, projects) => ({
            ...projects,
            items: projects.items.map((p: Project) =>
              p.id === projectID ? { ...p, ...data } : p
            ),
          }),
          revalidate: false,
        }
      );

      toast({
        title: 'Changes Saved',
        description: `The general info for ${payload.appName} has been successfully updated.`,
      });
    } catch (error: any) {
      console.error('[Update General Info]', error);
      toast({
        title: 'Updating Error',
        description: error?.response?.data?.message || APIErrors.GenericForm,
        variant: 'destructive',
      });
    }
  }

  async function deleteProject(projectID: string, appName: string) {
    try {
      await mutate(
        '/projects',
        labsAPI.delete<Project>(`/projects/${projectID}`),
        {
          populateCache: (_, projects) => ({
            ...projects,
            items: projects.items.filter((p: Project) => p.id !== projectID),
          }),
          revalidate: false,
        }
      );

      toast({
        title: 'Project Deleted',
        description: `Your project ${appName} has been successfully deleted.`,
      });
    } catch (error: any) {
      console.error('[Delete Project]', error);
      toast({
        title: 'Deleting Error',
        description: error?.response?.data?.message || APIErrors.Generic,
        variant: 'destructive',
      });
    }
  }

  return {
    createProject,
    updateGeneralInfo,
    deleteProject,
  };
}
