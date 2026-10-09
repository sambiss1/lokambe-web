import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {DeleteEntry} from '@/components/admin/collections/DeleteEntry';
import {PageHeader} from '@/components/admin/PageHeader';
import {DataRow} from '@/components/admin/Surface';
import {listAdminArticles} from '@/lib/api/admin';
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

  // L'API refuse la suppression d'un thème encore porté. On compte ici pour le
  // dire avant le clic, avec le nombre et le chemin pour les retrouver —
  // plutôt que de laisser le client buter sur « cet élément est encore utilisé
  // ailleurs », qui ne dit ni combien ni où.
  const portes = await listAdminArticles({category: entry.slug}, 1);

  return (
    <>
      <BackLink href={`/admin/themes/${entry.id}`}>{entry.fr.name}</BackLink>
      <PageHeader eyebrow="Thèmes" title={`Supprimer « ${entry.fr.name} »`} />
      <DeleteEntry
        collection="themes"
        id={entry.id}
        question={`Supprimer le thème « ${entry.fr.name} » ?`}
        consequence="Pour retirer ce thème du blog sans l’effacer, dépubliez-le plutôt que de le supprimer."
        blocked={
          portes.total > 0 ? (
            <>
              {portes.total === 1
                ? 'Un article porte ce thème'
                : `${portes.total} articles portent ce thème`}
              , brouillons compris. Reclassez-les avant de le supprimer — ou
              dépubliez simplement le thème pour le retirer du blog.
            </>
          ) : undefined
        }
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
