import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {FaqForm} from '@/components/admin/collections/FaqForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {getCollectionEntry} from '@/lib/api/admin-content';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const entry = await getCollectionEntry('faq', id);
  return {title: entry ? `Modifier « ${entry.fr.question} »` : 'Question'};
}

export default async function EditFaqPage({params}: Props) {
  const {id} = await params;
  const entry = await getCollectionEntry('faq', id);
  if (!entry) notFound();

  return (
    <>
      <BackLink href={`/admin/questions/${entry.id}`}>{entry.fr.question}</BackLink>
      <PageHeader
        eyebrow="Questions fréquentes"
        // La question entière tient dans le titre : c'est elle qui identifie la fiche,
        // il n'y a pas de nom plus court à afficher. Les guillemets évitent de la lire
        // comme la suite de « Modifier ».
        title={`Modifier « ${entry.fr.question} »`}
        description="Les champs anglais laissés vides reprennent le français sur /en."
      />
      <FaqForm entry={entry} />
    </>
  );
}
