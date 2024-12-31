'use client';

import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import Utils from '@repo/utils';
import { UserSession } from '@/_services/server-auth-session-service';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@repo/ui/dropdown';
import { Loader, LogOut } from 'lucide-react';
import { useSession } from '@/_libs/_nextjs/v14';
import { cn } from '@repo/ui/core/utils';

type Props = {
  session?: UserSession;
};

export default function UserAvatar({ session }: Props) {
  const { logout, isLoggingOut } = useSession();

  return (
    session && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar size="sm" className="cursor-pointer">
            <AvatarFallback>
              {Utils.getFirstAndLastInitials(session?.user?.fullName || '')}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={cn({
                'pointer-events-none': isLoggingOut,
              })}
              onSelect={logout}
            >
              {!isLoggingOut ? (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </>
              ) : (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Logging out...
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
