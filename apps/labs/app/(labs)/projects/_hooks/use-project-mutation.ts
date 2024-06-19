import { labsAPI } from '@helpers/api';
import { useState } from 'react';
import { NewProjectFormData } from '../_validators/projects-validators';
import { useToast } from '@repo/ui/hooks/use-toast';
import { Environment } from '@/(labs)/_interfaces/environment';
import { Project } from '@/(labs)/_interfaces/project';

export default function useProjectMutation() {
  const { toast } = useToast();

  async function createProject(payload: NewProjectFormData) {
    try {
      const { data } = await labsAPI.post<
        Project & { environment: Environment }
      >('/projects', payload);

      toast({
        title: 'Project Created',
        description: `Your project ${payload.appName} has been created successfully`,
      });

      return data;
    } catch (error: any) {
      console.error('[Create Project]', error);
      toast({
        title: 'Project Creation Error',
        description:
          error?.response?.data?.message ||
          'Your project could not be created. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return {
    createProject,
  };
}
