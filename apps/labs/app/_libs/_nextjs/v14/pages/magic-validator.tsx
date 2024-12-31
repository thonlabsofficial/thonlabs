import { redirect, RedirectType } from 'next/navigation';
import { APIResponseCodes } from '../../shared/utils/errors';

interface Props {
  token: string;
  inviteFlow?: boolean;
}

export default async function MagicValidator({ token, inviteFlow }: Props) {
  redirect(
    `/api/auth/magic/${token}${inviteFlow ? `?info=${APIResponseCodes.InviteAccepted}` : ''}`,
    RedirectType.replace,
  );
  return null;
}
