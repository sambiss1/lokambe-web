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
  const entry = await getCollectionEntry('themes', id);
  return {title: entry ? `Supprimer « ${entry.fr.name} »` : 'Supprimer'};
}

export default async function DeleteThemePage({params}: Props) {
  const {id} = await params;
  const entry = await getCollectionEntry('themes', id);
  if (!entry) notFound();

  return (
    <>
      <BackLink href={`/admin/themes/${entry.id}`}>{entry.fr.name}</BackLink>
      <PageHeader eyebrow="Thèmes" title={`Supprimer « ${entry.fr.name} »`} />
      <DeleteEntry
        collection="themes"
        id={entry.id}
        question={`Supprimer le thème « ${entry.fr.name} » ?`}
        consequence="La suppression est refusée tant qu’un article porte ce thème, brouillons compris : reclassez-les d’abord. Pour le retirer seulement du blog, dépubliez-le plutôt que de le supprimer."
        doneHref="/admin/themes"
        cancelHref={`/admin/themes/${entry.id}`}
        summary={
          <dl>
            <DataRow label="Adresse du thème" value={entry.slug} />
          </dl>
        }
      />
    </>
  );
}
