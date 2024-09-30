import { NextRequest } from 'next/server';

export function getURLFromHost(req: NextRequest, includePathname = true) {
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');

  if (!host) {
    console.error('helpers.getURLFromHost: Unable to determine host');
    return new URL('/', req.url);
  }

  const protocol = req.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;
  const pathname = req.nextUrl.pathname;

  if (includePathname) {
    return new URL(pathname, baseUrl);
  }

  return new URL(baseUrl);
}

export function forwardSearchParams(req: NextRequest, path: string) {
  const url = getURLFromHost(req, false);
  const redirectUrl = new URL(path, url.toString());
  redirectUrl.search = req.nextUrl.search;

  return redirectUrl;
}
