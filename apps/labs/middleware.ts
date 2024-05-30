import { NextRequest, NextResponse } from 'next/server';
import ServerSessionService from './app/(logged)/auth/_services/server-session-service';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/labs') && !ServerSessionService.isValid()) {
    return NextResponse.redirect(new URL('/api/auth/logout', req.url));
  }

  return NextResponse.next();
}
