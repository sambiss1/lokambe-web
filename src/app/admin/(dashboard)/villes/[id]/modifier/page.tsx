import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {CityForm} from '@/components/admin/collections/CityForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {getCollectionEntry} from '@/lib/api/admin-content';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const entry = await getCollectionEntry('cities', id);
  return {title: entry ? `Modifier « ${entry.fr.name} »` : 'Ville'};
}

export default async function EditCityPage({params}: Props) {
  const {id} = await params;
  const entry = await getCollectionEntry('cities', id);
  if (!entry) notFound();

  return (
    <>
      <BackLink href={`/admin/villes/${entry.id}`}>{entry.fr.name}</BackLink>
      <PageHeader
        eyebrow="Villes"
        title={`Modifier « ${entry.fr.name} »`}
        description="Le nom est celui que le candidat lira dans le menu. Les candidatures déjà reçues gardent la ville qu’elles portaient."
      />
      <CityForm entry={entry} />
    </>
  );
}
