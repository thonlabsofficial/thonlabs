import Login from './login';
import MagicSent from './magic-sent';
import MagicValidator from './magic-validator';
import Logout from './logout';

export function ThonlabsAuthPage({ params }: { params: { thonlabs: string } }) {
  const [route, param] = params.thonlabs || [];

  return (
    <>
      {route === 'login' && <Login />}
      {route === 'magic' && param && <MagicValidator token={param} />}
      {route === 'magic' && <MagicSent />}
      {route === 'logout' && <Logout />}
    </>
  );
}
