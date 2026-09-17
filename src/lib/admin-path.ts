export function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

/** L'écran de connexion est le seul du back-office accessible sans session. */
export function isAdminLoginPath(pathname: string): boolean {
  return pathname === '/admin/login' || pathname.startsWith('/admin/login/');
}
