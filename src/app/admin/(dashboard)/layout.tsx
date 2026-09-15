import type {ReactNode} from 'react';
import {AdminShell} from '@/components/admin/AdminShell';

// TODO(api) : vérifier ici le cookie de session et rediriger vers /admin/login si absent.
export default function DashboardLayout({children}: {children: ReactNode}) {
  return <AdminShell>{children}</AdminShell>;
}
