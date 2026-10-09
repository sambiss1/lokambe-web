import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {DeleteEntry} from '@/components/admin/collections/DeleteEntry';
import {PageHeader} from '@/components/admin/PageHeader';
import {DataRow} from '@/components/admin/Surface';
import {getCollectionEntry} from '@/lib/api/admin-content';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const entry = await getCollectionEntry('cities', id);
  return {title: entry ? `Supprimer « ${entry.fr.name} »` : 'Supprimer'};
}

export default async function DeleteCityPage({params}: Props) {
  const {id} = await params;
  const entry = await getCollectionEntry('cities', id);
  if (!entry) notFound();

  return (
    <>
      <BackLink href={`/admin/villes/${entry.id}`}>{entry.fr.name}</BackLink>
      <PageHeader eyebrow="Villes" title={`Supprimer « ${entry.fr.name} »`} />
      <DeleteEntry
        collection="cities"
        id={entry.id}
        question={`Supprimer la ville « ${entry.fr.name} » ?`}
        consequence="La ville disparaît du menu du formulaire de candidature. Les candidatures déjà reçues gardent la leur : rien n’est perdu. Pour la retirer du menu sans l’effacer, dépubliez-la."
        doneHref="/admin/villes"
        cancelHref={`/admin/villes/${entry.id}`}
        summary={
          <dl>
            <DataRow label="Adresse de la fiche" value={entry.slug} />
          </dl>
        }
      />
    </>
  );
}
