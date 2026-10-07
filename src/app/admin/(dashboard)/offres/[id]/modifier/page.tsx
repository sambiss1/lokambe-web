import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {JobForm} from '@/components/admin/collections/JobForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {getCollectionEntry, getMedia, listMedia} from '@/lib/api/admin-content';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const job = await getCollectionEntry('jobs', id);
  return {title: job ? `Modifier ${job.fr.title}` : 'Offre d’emploi'};
}

export default async function EditJobPage({params}: Props) {
  const {id} = await params;
  const job = await getCollectionEntry('jobs', id);
  if (!job) notFound();

  const [library, media] = await Promise.all([
    listMedia({kind: 'image'}, 100),
    job.mediaId ? getMedia(job.mediaId) : Promise.resolve(null),
  ]);

  return (
    <>
      <BackLink href={`/admin/offres/${job.id}`}>{job.fr.title}</BackLink>
      <PageHeader
        eyebrow="Offres d’emploi"
        title={`Modifier ${job.fr.title}`}
        description="Les champs anglais laissés vides reprennent le français sur /en."
      />
      <JobForm job={job} library={library.items} media={media} />
    </>
  );
}
