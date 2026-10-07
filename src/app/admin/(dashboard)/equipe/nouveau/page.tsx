import type {Metadata} from 'next';
import {BackLink} from '@/components/admin/AdminButton';
import {TeamForm} from '@/components/admin/collections/TeamForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {listMedia} from '@/lib/api/admin-content';

export const metadata: Metadata = {title: 'Nouveau membre'};

export default async function NewTeamMemberPage() {
  const library = await listMedia({kind: 'image'}, 100);

  return (
    <>
      <BackLink href="/admin/equipe">Équipe</BackLink>
      <PageHeader
        eyebrow="Équipe"
        title="Nouveau membre"
        description="Renseignez le rôle, enregistrez, publiez quand il est prêt à paraître."
      />
      <TeamForm library={library.items} />
    </>
  );
}
