import type {Metadata} from 'next';
import {ApplicationsBrowser} from '@/components/admin/ApplicationsBrowser';
import {PageHeader} from '@/components/admin/PageHeader';
import {
  APPLICATION_STATUSES,
  type ApplicationFilters,
  MOCK_APPLICATIONS,
  SECTORS,
} from '@/lib/admin-mock';

export const metadata: Metadata = {title: 'Candidatures'};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? '';
}

function oneOf(value: string, allowed: readonly string[]): string {
  return allowed.includes(value) ? value : '';
}

/** Les liens du tableau de bord arrivent avec `?status=…` : on en fait l'état initial. */
export default async function ApplicationsPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const initialFilters: ApplicationFilters = {
    status: oneOf(first(sp.status), APPLICATION_STATUSES),
    sector: oneOf(first(sp.sector), SECTORS),
    q: first(sp.q),
  };

  // TODO(api) : remplacer par GET /admin/applications?<filtres>&page=&limit= (filtrage et pagination côté serveur).
  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Candidatures"
        description="Filtrez le pipeline par statut, secteur ou mot-clé, puis ouvrez un dossier pour le faire avancer."
      />
      <ApplicationsBrowser applications={MOCK_APPLICATIONS} initialFilters={initialFilters} />
    </>
  );
}
