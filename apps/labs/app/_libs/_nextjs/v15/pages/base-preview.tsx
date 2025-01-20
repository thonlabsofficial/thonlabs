import ConfirmEmailValidator from './confirm-email-validator';
import Login from './login';
import MagicSent from './magic-sent';
import MagicValidator from './magic-validator';
import ResetPasswordCreate from './reset-password-create';
import ResetPasswordRequire from './reset-password-require';
import SignUp from './sign-up';

export function ThonLabsAuthPagePreview({
  params,
  searchParams,
}: {
  params: { thonlabs: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { thonlabs } = params;
  const { inviteFlow } = searchParams;
  const [route, param] = thonlabs || [];
  const inviteFlowParam = inviteFlow === 'true';
  const inviteFlowEmail = Buffer.from(
    (inviteFlow as string) || '',
    'base64',
  ).toString('utf-8');

  return (
    <div className="bg-background text-text">
      {route === 'login' && <Login />}
      {route === 'magic' && param && (
        <MagicValidator token={param} inviteFlow={inviteFlowParam} />
      )}
      {route === 'magic' && <MagicSent />}
      {route === 'sign-up' && <SignUp />}
      {route === 'confirm-email' && param && (
        <ConfirmEmailValidator token={param} />
      )}
      {route === 'reset-password' && param && (
        <ResetPasswordCreate token={param} inviteFlowEmail={inviteFlowEmail} />
      )}
      {route === 'reset-password' && <ResetPasswordRequire />}
    </div>
  );
}
