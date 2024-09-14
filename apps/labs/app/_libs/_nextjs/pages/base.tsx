import MainHeader from '@/_components/main-header';
import Login from './login';
import MagicSent from './magic-sent';
import MagicValidator from './magic-validator';

export function ThonlabsAuthPage({ params }: { params: { thonlabs: string } }) {
  const [route, param] = params.thonlabs || [];

  return (
    <>
      <MainHeader withNav={false} />

      {route === 'login' && <Login />}
      {route === 'magic' && param && <MagicValidator token={param} />}
      {route === 'magic' && <MagicSent />}
    </>
  );
}
