import type {Metadata} from 'next';
import {ApplicationsBrowser} from '@/components/admin/ApplicationsBrowser';
import {PageHeader} from '@/components/admin/PageHeader';
import {listApplications, PAGE_SIZE} from '@/lib/api/admin';
import type {ApplicationFilters} from '@/lib/api/admin-types';
import {APPLICATION_STATUSES, type ApplicationStatus, SECTORS, type Sector} from '@/lib/constants';

export const metadata: Metadata = {title: 'Candidatures'};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? '';
}

/**
 * L'API refuse toute valeur hors énumération : une URL bricolée à la main
 * doit donc perdre son filtre, pas provoquer un 400.
 */
function oneOf<T extends string>(value: string, allowed: readonly T[]): T | undefined {
  return (allowed as readonly string[]).includes(value) ? (value as T) : undefined;
}

function pageNumber(value: string): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
}

/** Les filtres vivent dans l'URL : l'API fait le tri, la recherche et la pagination. */
export default async function ApplicationsPage({searchParams}: {searchParams: Promise<SearchParams>}) {
  const sp = await searchParams;
  const filters: ApplicationFilters = {
    status: oneOf<ApplicationStatus>(first(sp.status), APPLICATION_STATUSES),
    sector: oneOf<Sector>(first(sp.sector), SECTORS),
    q: first(sp.q).trim() || undefined,
    page: pageNumber(first(sp.page)),
  };

  const result = await listApplications(filters);

  return (
    <>
      <PageHeader
        eyebrow="Back-office"
        title="Candidatures"
        description="Filtrez le pipeline par statut, secteur ou mot-clé, puis ouvrez un dossier pour le faire avancer."
      />
      <ApplicationsBrowser result={result} filters={filters} pageSize={PAGE_SIZE} />
    </>
  );
}
