import { Environment } from '@/(labs)/_interfaces/environment';
import { Project } from '@/(labs)/_interfaces/project';
import { useSession } from '@/_libs/_nextjs';
import { useCookies } from 'react-cookie';

export default function useUserSession() {
  const session = useSession();
  const [cookies, setCookie, removeCookie] = useCookies(['tl_env']);
  const environment: Environment = cookies.tl_env;

  function setEnv({
    environment,
    project,
  }: {
    environment: Environment;
    project: Project;
  }) {
    const data = {
      ...environment,
      project: {
        id: project.id,
        appName: project.appName,
      },
    };
    setCookie('tl_env', JSON.stringify(data), { path: '/' });
  }

  function clearEnv() {
    removeCookie('tl_env', { path: '/' });
  }

  return {
    user: session.user,
    environment,
    setEnv,
    clearEnv,
  };
}
