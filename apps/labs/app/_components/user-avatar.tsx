import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import Utils from '@repo/utils';
import { UserSession } from '@/(labs)/_services/server-auth-session-service';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@repo/ui/dropdown';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

type Props = {
  session?: UserSession;
};

export default function UserAvatar({ session }: Props) {
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
            <Link href="/auth/logout">
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
