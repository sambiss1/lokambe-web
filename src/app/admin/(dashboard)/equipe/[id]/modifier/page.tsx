import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {TeamForm} from '@/components/admin/collections/TeamForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {getCollectionEntry, getMedia, listMedia} from '@/lib/api/admin-content';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const member = await getCollectionEntry('team', id);
  return {title: member ? `Modifier ${member.name ?? member.fr.title}` : 'Membre'};
}

export default async function EditTeamMemberPage({params}: Props) {
  const {id} = await params;
  const member = await getCollectionEntry('team', id);
  if (!member) notFound();

  const [library, media] = await Promise.all([
    listMedia({kind: 'image'}, 100),
    member.mediaId ? getMedia(member.mediaId) : Promise.resolve(null),
  ]);

  // Le nom n’est publié que pour le dirigeant : sinon le rôle sert d’intitulé.
  const heading = member.name ?? member.fr.title;

  return (
    <>
      <BackLink href={`/admin/equipe/${member.id}`}>{heading}</BackLink>
      <PageHeader
        eyebrow="Équipe"
        title={`Modifier ${heading}`}
        description="Les champs anglais laissés vides reprennent le français sur /en."
      />
      <TeamForm member={member} library={library.items} media={media} />
    </>
  );
}
