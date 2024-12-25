import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Precompile regex for better performance
const STATIC_ASSETS = /\.(css|js|jpg|jpeg|png|gif|ico|svg|woff2?)$/i;
const CACHE_CONTROL_VALUE = 'public, max-age=31536000, immutable';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Only apply caching for static assets
  if (STATIC_ASSETS.test(pathname)) {
    response.headers.set('Cache-Control', CACHE_CONTROL_VALUE);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.delete('Vary');
  } else {
    // For dynamic routes, use a more conservative caching strategy
    response.headers.set('Cache-Control', 'no-cache, must-revalidate');
  }

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

// Optimize matcher patterns
export const config = {
  matcher: [
    // Exclude certain paths from middleware processing
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

