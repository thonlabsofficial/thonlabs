import { NextRequest } from 'next/server';

export function forwardSearchParams(req: NextRequest, path: string) {
  const redirectUrl = new URL(path, req.url);
  redirectUrl.search = req.nextUrl.search;

  return redirectUrl;
}
