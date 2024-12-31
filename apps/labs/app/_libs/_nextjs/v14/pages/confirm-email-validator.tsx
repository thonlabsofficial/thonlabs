import { redirect, RedirectType } from 'next/navigation';

interface Props {
  token: string;
}

export default async function ConfirmEmailValidator({ token }: Props) {
  redirect(`/api/auth/confirm-email/${token}`, RedirectType.replace);
  return null;
}
