import ConfirmEmailValidator from './confirm-email-validator';
import Login from './login';
import MagicSent from './magic-sent';
import MagicValidator from './magic-validator';
import ResetPasswordCreate from './reset-password-create';
import ResetPasswordRequire from './reset-password-require';
import SignUp from './sign-up';

interface Params {
  route: string;
  param: string;
  inviteFlow: boolean;
  inviteFlowEmail: string;
}

export function pageRender({
  route,
  param,
  inviteFlow,
  inviteFlowEmail,
}: Params) {
  if (route === 'login') return <Login />;
  if (route === 'magic' && param)
    return <MagicValidator token={param} inviteFlow={inviteFlow} />;
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
