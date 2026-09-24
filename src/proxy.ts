import createIntlMiddleware from 'next-intl/middleware';
import {NextResponse, type NextRequest} from 'next/server';
import {routing} from './i18n/routing';
import {isAdminLoginPath, isAdminPath} from './lib/admin-path';
import {SESSION_COOKIE} from './lib/api/session';

const handleI18n = createIntlMiddleware(routing);

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if (isAdminPath(pathname)) {
    // Le back-office n'est pas traduit : il échappe à la redirection de langue.
    const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

    if (!hasSession && !isAdminLoginPath(pathname)) {
      const login = new URL('/admin/login', request.url);
      // Où l'on voulait aller : l'écran de connexion y renvoie ensuite.
      login.searchParams.set('suite', pathname + request.nextUrl.search);
      return NextResponse.redirect(login);
    }

    if (hasSession && isAdminLoginPath(pathname)) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Cette garde ne vérifie que la présence du cookie, jamais la validité du
    // jeton : c'est l'API qui tranche. Un jeton expiré passe donc ici et se
    // fait refuser plus loin, où la session est alors effacée.
    return NextResponse.next();
  }

  return handleI18n(request);
}

export const config = {
  // Tout sauf /api, les fichiers internes Next et les fichiers avec extension.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
