import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ApplicationDetail} from '@/components/admin/ApplicationDetail';
import {getApplication} from '@/lib/api/admin';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const application = await getApplication(id);
  return {title: application ? application.reference : 'Candidature'};
}

export default async function ApplicationDetailPage({params}: Props) {
  const {id} = await params;

  // L'API répond 404 aussi bien pour un dossier supprimé que pour un
  // identifiant mal formé : les deux cas se valent ici.
  const application = await getApplication(id);
  if (!application) notFound();

  return <ApplicationDetail application={application} />;
}
