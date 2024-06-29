import { labsAPI } from '@helpers/api';
import { NewEnvironmentFormData } from '../_validators/projects-validators';
import { useToast } from '@repo/ui/hooks/use-toast';
import { Environment } from '@/(labs)/_interfaces/environment';

export default function useEnvironment() {
  const { toast } = useToast();

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
      console.error('[Create Environment]', error);
      toast({
        title: "We couldn't create your environment",
        description:
          error?.response?.data?.message ||
          "We're not sure if it was on our end. Please check the fields and try again.",
        variant: 'destructive',
      });
    }
  }

  return {
    createEnvironment,
  };
}
