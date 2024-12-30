import { pageRender } from '../../current/pages/page-render';

export function ThonlabsAuthPage({
  params,
  searchParams,
}: {
  params: { thonlabs: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [route, param] = params.thonlabs || [];
  const inviteFlow = searchParams?.inviteFlow === 'true';
  const inviteFlowEmail = Buffer.from(
    (searchParams?.inviteFlow as string) || '',
    'base64',
  ).toString('utf-8');

  return pageRender({
    route: route as string,
    param: param as string,
    inviteFlow,
    inviteFlowEmail,
  });
}
