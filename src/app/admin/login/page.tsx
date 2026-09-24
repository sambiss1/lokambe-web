import type {Metadata} from 'next';
import {Suspense} from 'react';
import {isAdminApiConfigured} from '@/lib/api/server';
import {Logo} from '@/components/ui/Logo';
import {LoginForm} from './LoginForm';

export const metadata: Metadata = {title: 'Connexion'};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-lokambe-blue px-5 py-12">
      <div className="w-full max-w-[26rem]">
        <div className="rounded-[1.75rem] bg-white p-7 shadow-2xl shadow-[#000d80]/35 sm:p-9">
          <Logo tone="blue" className="w-36" priority />
          <h1 className="display mt-7 text-3xl">Back-office</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Accès réservé à l’équipe LOKAMBE : candidatures, pipeline d’investissement et messages.
          </p>

          <div className="mt-7">
            {/* `LoginForm` lit la destination demandée dans l'URL : Suspense est
                nécessaire pour que la page reste pré-rendue. */}
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        {!isAdminApiConfigured && (
          <p className="mt-6 px-2 text-center text-sm text-white/70">
            Maquette d’interface — aucun identifiant n’est vérifié et aucune donnée n’est enregistrée.
          </p>
        )}
      </div>
    </main>
  );
}
