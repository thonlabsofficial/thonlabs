import { pageRender } from './page-render';

export async function ThonLabsAuthPage({
  params,
  searchParams,
}: {
  params: { thonlabs: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { thonlabs } = await params;
  const { inviteFlow } = await searchParams;
  const [route, param] = thonlabs || [];
  const inviteFlowParam = inviteFlow === 'true';
  const inviteFlowEmail = Buffer.from(
    (inviteFlow as string) || '',
    'base64',
  ).toString('utf-8');

  return pageRender({
    route: route as string,
    param: param as string,
    inviteFlow: inviteFlowParam,
    inviteFlowEmail,
  });
}
