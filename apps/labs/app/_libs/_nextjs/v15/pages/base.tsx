import ConfirmEmailValidator from './confirm-email-validator';
import Login from './login';
import MagicSent from './magic-sent';
import MagicValidator from './magic-validator';
import ResetPasswordCreate from './reset-password-create';
import ResetPasswordRequire from './reset-password-require';
import SignUp from './sign-up';

type Params = Promise<{ thonlabs: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function ThonLabsAuthPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { thonlabs } = await params;
  const { inviteFlow } = await searchParams;
  const [route, param] = thonlabs || [];
  const inviteFlowParam = inviteFlow === 'true';
  const inviteFlowEmail = Buffer.from(
    (inviteFlow as string) || '',
    'base64',
  ).toString('utf-8');

  if (route === 'login') return <Login />;
  if (route === 'magic' && param)
    return <MagicValidator token={param} inviteFlow={inviteFlowParam} />;
  if (route === 'magic') return <MagicSent />;
  if (route === 'sign-up') return <SignUp />;
  if (route === 'confirm-email' && param)
    return <ConfirmEmailValidator token={param} />;
  if (route === 'reset-password' && param)
    return (
      <ResetPasswordCreate token={param} inviteFlowEmail={inviteFlowEmail} />
    );
  if (route === 'reset-password') return <ResetPasswordRequire />;
}
