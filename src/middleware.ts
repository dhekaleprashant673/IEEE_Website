import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isDashboardRoute = path.startsWith('/admin/dashboard');
  const isLoginRoute = path === '/admin/login';

  const token = request.cookies.get('admin_token')?.value;

  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginRoute && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
