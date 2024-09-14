import { redirect, RedirectType } from 'next/navigation';

interface Props {
  token: string;
}

export default async function MagicValidator({ token }: Props) {
  redirect(`/api/auth/magic/${token}`, RedirectType.replace);
  return null;
}
