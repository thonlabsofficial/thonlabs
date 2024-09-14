import { redirect, RedirectType } from 'next/navigation';

export default async function Logout() {
  redirect(`/api/auth/logout`, RedirectType.replace);
  return null;
}
