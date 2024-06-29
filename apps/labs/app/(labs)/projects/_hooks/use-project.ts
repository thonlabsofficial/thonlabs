import { labsAPI } from '../../../../helpers/api';
import { useState } from 'react';
import { NewProjectFormData } from '../_validators/projects-validators';
import { useToast } from '@repo/ui/hooks/use-toast';
import { Environment } from '@/(labs)/_interfaces/environment';
import { Project } from '@/(labs)/_interfaces/project';

export default function useProject() {
  const { toast } = useToast();

  async function createProject(payload: NewProjectFormData) {
    try {
      const { data } = await labsAPI.post<
        Project & { environment: Environment }
      >('/projects', payload);

      toast({
        title: 'This is a beginning of something!',
        description: `Your project ${payload.appName} has been successfully created.`,
      });

      return data;
    } catch (error: any) {
      console.error('[Create Project]', error);
      toast({
        title: "We couldn't create your project",
        description:
          error?.response?.data?.message ||
          "We're not sure if it was on our end. Please check the fields and try again.",
        variant: 'destructive',
      });
    }
  }

  return {
    createProject,
  };
}
