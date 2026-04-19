import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getUserFromCookie(request: NextRequest) {
  const raw = request.cookies.get('session_user')?.value;
  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw)) as { role?: string };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();

  response.headers.set('x-pathname', pathname);

  if (pathname.startsWith('/upload') || pathname.startsWith('/admin')) {
    const user = getUserFromCookie(request);

    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (user.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};