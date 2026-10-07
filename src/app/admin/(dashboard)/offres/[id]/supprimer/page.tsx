import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {DeleteEntry} from '@/components/admin/collections/DeleteEntry';
import {PageHeader} from '@/components/admin/PageHeader';
import {DataRow} from '@/components/admin/Surface';
import {getCollectionEntry} from '@/lib/api/admin-content';
import {CONTRACT_TYPE_LABELS} from '@/lib/constants';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const job = await getCollectionEntry('jobs', id);
  return {title: job ? `Supprimer ${job.fr.title}` : 'Supprimer'};
}

export default async function DeleteJobPage({params}: Props) {
  const {id} = await params;
  const job = await getCollectionEntry('jobs', id);
  if (!job) notFound();

  return (
    <>
      <BackLink href={`/admin/offres/${job.id}`}>{job.fr.title}</BackLink>
      <PageHeader eyebrow="Offres d’emploi" title={`Supprimer ${job.fr.title}`} />
      <DeleteEntry
        collection="jobs"
        id={job.id}
        question={`Supprimer l’offre « ${job.fr.title} » ?`}
        consequence="La fiche disparaît du back-office et de la page Carrières. Le visuel reste dans la médiathèque : il n’est pas supprimé avec elle."
        doneHref="/admin/offres"
        cancelHref={`/admin/offres/${job.id}`}
        summary={
          <dl>
            <DataRow label="Lieu" value={job.location} />
            <DataRow label="Type de contrat" value={CONTRACT_TYPE_LABELS[job.contractType]} />
            <DataRow label="Résumé" value={job.fr.summary} />
          </dl>
        }
      />
    </>
  );
}
