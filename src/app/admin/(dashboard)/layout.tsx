import type {ReactNode} from 'react';
import {AdminShell} from '@/components/admin/AdminShell';

/**
 * La garde de session est portée par `src/proxy.ts`, qui s'exécute avant le
 * rendu. Les lectures de `src/lib/api/admin.ts` repassent tout de même par la
 * connexion si l'API refuse le jeton : le cookie peut avoir expiré entre-temps.
 */
export default function DashboardLayout({children}: {children: ReactNode}) {
  return <AdminShell>{children}</AdminShell>;
}
