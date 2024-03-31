import { NextRequest, NextResponse } from 'next/server';
import Session from './app/auth/_services/auth-services';

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/labs') && !Session.isValid()) {
    return NextResponse.redirect(new URL('/api/auth/logout', req.url));
  }

  return NextResponse.next();
}
