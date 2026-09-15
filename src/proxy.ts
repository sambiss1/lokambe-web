import createIntlMiddleware from 'next-intl/middleware';
import {NextResponse, type NextRequest} from 'next/server';
import {routing} from './i18n/routing';
import {isAdminPath} from './lib/admin-path';

const handleI18n = createIntlMiddleware(routing);

export function proxy(request: NextRequest) {
  if (isAdminPath(request.nextUrl.pathname)) {
    // Plan 3 : vérification du cookie admin et redirection vers /admin/login.
    return NextResponse.next();
  }

  return handleI18n(request);
}

export const config = {
  // Tout sauf /api, les fichiers internes Next et les fichiers avec extension.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
