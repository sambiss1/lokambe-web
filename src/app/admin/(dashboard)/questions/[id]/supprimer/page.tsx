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
  const entry = await getCollectionEntry('faq', id);
  return {title: entry ? `Supprimer « ${entry.fr.question} »` : 'Supprimer'};
}

export default async function DeleteFaqPage({params}: Props) {
  const {id} = await params;
  const entry = await getCollectionEntry('faq', id);
  if (!entry) notFound();

  return (
    <>
      <BackLink href={`/admin/questions/${entry.id}`}>{entry.fr.question}</BackLink>
      <PageHeader eyebrow="Questions fréquentes" title={`Supprimer « ${entry.fr.question} »`} />
      <DeleteEntry
        collection="faq"
        id={entry.id}
        question={`Supprimer « ${entry.fr.question} » des questions fréquentes ?`}
        consequence="La question disparaît du back-office et de la page Contact. Les questions suivantes remontent d’un rang."
        doneHref="/admin/questions"
        cancelHref={`/admin/questions/${entry.id}`}
        summary={
          <dl>
            <DataRow label="Réponse" value={entry.fr.answer} />
          </dl>
        }
      />
    </>
  );
}
