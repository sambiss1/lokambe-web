import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {AdminButtonLink, BackLink} from '@/components/admin/AdminButton';
import {StatusPill} from '@/components/admin/CollectionBrowser';
import {EntryStatusActions} from '@/components/admin/form/EntryStatusActions';
import {EntryViewShell} from '@/components/admin/form/EntryViewShell';
import {PageHeader} from '@/components/admin/PageHeader';
import {DataRow, Panel} from '@/components/admin/Surface';
import {getCollectionEntry} from '@/lib/api/admin-content';
import {formatDateTime} from '@/lib/admin-format';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const entry = await getCollectionEntry('cities', id);
  return {title: entry ? entry.fr.name : 'Ville'};
}

export default async function CityPage({params}: Props) {
  const {id} = await params;
  const entry = await getCollectionEntry('cities', id);
  if (!entry) notFound();

  return (
    <>
      <BackLink href="/admin/villes">Villes</BackLink>
      <PageHeader
        eyebrow="Villes"
        title={entry.fr.name}
        description={
          entry.status === 'publie'
            ? 'Proposée dans le menu « Ville » du formulaire de candidature.'
            : 'Brouillon : absente du formulaire de candidature.'
        }
        actions={<StatusPill status={entry.status} />}
      />

      <EntryViewShell
        editHref={`/admin/villes/${entry.id}/modifier`}
        aside={
          <Panel title="Actions">
            <EntryStatusActions collection="cities" id={entry.id} status={entry.status} />
            <div className="mt-2.5">
              <AdminButtonLink tone="danger" href={`/admin/villes/${entry.id}/supprimer`} className="w-full">
                Supprimer
              </AdminButtonLink>
            </div>
          </Panel>
        }
      >
        <DataRow label="Nom (fr)" value={entry.fr.name} />
        <DataRow label="Nom (en)" value={entry.en?.name} />
        <DataRow label="Adresse de la fiche" value={entry.slug} />
        <DataRow label="Rang d’affichage" value={String(entry.order + 1)} />
        <DataRow label="Dernière modification" value={formatDateTime(entry.updatedAt)} />
      </EntryViewShell>
    </>
  );
}
