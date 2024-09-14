import { notFound } from 'next/navigation';

const allowedRoutes = ['login', 'sign', 'magic', 'reset-password'];

export default async function ThonlabsAuthPage({
  params,
}: {
  params: { thonlabs: string };
}) {
  const route = params.thonlabs[0];

  if (!route || !allowedRoutes.includes(route)) {
    console.log('Not allowed', route);
    notFound();
  }

  return <div>Thonlabs Auth Page, route: {route}</div>;
}
