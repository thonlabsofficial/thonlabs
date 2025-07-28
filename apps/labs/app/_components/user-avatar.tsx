'use client';

import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import { cn } from '@repo/ui/core/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown';
import Utils from '@repo/utils';
import { useSession } from '@thonlabs/nextjs';
import { BlocksIcon, Loader, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { UserSession } from '@/_services/server-auth-session-service';

type Props = {
  session?: UserSession;
};

export default function UserAvatar({ session }: Props) {
  const { logout, isLoggingOut } = useSession();
  const { environmentId } = useParams();

  return (
    session && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar size='sm' className='cursor-pointer'>
            <AvatarFallback>
              {Utils.getFirstAndLastInitials(session?.user?.fullName || '')}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-64' align='start'>
          {environmentId && (
            <>
              <Link href={`/${environmentId}/integration-guide`}>
                <DropdownMenuItem>
                  <BlocksIcon className='mr-2 h-4 w-4' />
                  Integration guide
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            className={cn({
              'pointer-events-none': isLoggingOut,
            })}
            onSelect={logout}
          >
            {!isLoggingOut ? (
              <>
                <LogOut className='mr-2 h-4 w-4' />
                Logout
              </>
            ) : (
              <>
                <Loader className='mr-2 h-4 w-4 animate-spin' />
                Logging out...
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
