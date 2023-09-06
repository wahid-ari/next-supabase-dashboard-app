import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

// FIX this
// TODO Docs https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
// TODO Docs https://github.com/nextauthjs/next-auth/issues/5695

export function middleware(request: NextRequest) {
  // check cookie, if valid return early
  // console.log(request);
  // console.log(request.nextUrl.pathname);
  // console.log(request.nextUrl.pathname.startsWith('/old'));
  if (request.nextUrl.pathname.startsWith('/old')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return withAuth(request as any);
}

// To include all dashboard nested routes (sub pages like /dashboard/settings, /dashboard/profile)
// you can pass matcher: "/dashboard/:path*" to config.
// export const config = { matcher: ['/old', '/dashboard/:path*', '/genre/:path*'] };
export const config = { matcher: ['/old', '/genre/:path*'] };
