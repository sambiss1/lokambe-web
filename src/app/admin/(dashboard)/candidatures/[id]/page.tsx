import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ApplicationDetail} from '@/components/admin/ApplicationDetail';
import {MOCK_APPLICATIONS} from '@/lib/admin-mock';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const application = MOCK_APPLICATIONS.find((item) => item.id === id);
  return {title: application ? application.reference : 'Candidature'};
}

export default async function ApplicationDetailPage({params}: Props) {
  const {id} = await params;

  // TODO(api) : remplacer par GET /admin/applications/<id> (404 de l'API → notFound()).
  const application = MOCK_APPLICATIONS.find((item) => item.id === id);
  if (!application) notFound();

  return <ApplicationDetail application={application} />;
}
