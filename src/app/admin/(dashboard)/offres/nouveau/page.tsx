import type {Metadata} from 'next';
import {BackLink} from '@/components/admin/AdminButton';
import {JobForm} from '@/components/admin/collections/JobForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {listMedia} from '@/lib/api/admin-content';

export const metadata: Metadata = {title: 'Nouvelle offre'};

export default async function NewJobPage() {
  const library = await listMedia({kind: 'image'}, 100);

  return (
    <>
      <BackLink href="/admin/offres">Offres d’emploi</BackLink>
      <PageHeader
        eyebrow="Offres d’emploi"
        title="Nouvelle offre"
        description="Renseignez la fiche, enregistrez, publiez quand le poste est ouvert aux candidatures."
      />
      <JobForm library={library.items} />
    </>
  );
}
