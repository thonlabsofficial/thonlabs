import ConfirmEmailValidator from './confirm-email-validator';
import Login from './login';
import MagicSent from './magic-sent';
import MagicValidator from './magic-validator';
import SignUp from './sign-up';

export function ThonlabsAuthPage({ params }: { params: { thonlabs: string } }) {
  const [route, param] = params.thonlabs || [];

  return (
    <>
      {route === 'login' && <Login />}
      {route === 'magic' && param && <MagicValidator token={param} />}
      {route === 'confirm-email' && param && (
        <ConfirmEmailValidator token={param} />
      )}
      {route === 'magic' && <MagicSent />}
      {route === 'sign-up' && <SignUp />}
    </>
  );
}
