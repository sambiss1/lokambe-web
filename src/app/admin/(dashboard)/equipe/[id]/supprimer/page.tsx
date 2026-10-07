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
  const member = await getCollectionEntry('team', id);
  return {title: member ? `Supprimer ${member.name ?? member.fr.title}` : 'Supprimer'};
}

export default async function DeleteTeamMemberPage({params}: Props) {
  const {id} = await params;
  const member = await getCollectionEntry('team', id);
  if (!member) notFound();

  // Le nom n’est publié que pour le dirigeant : sinon le rôle sert d’intitulé.
  const heading = member.name ?? member.fr.title;

  return (
    <>
      <BackLink href={`/admin/equipe/${member.id}`}>{heading}</BackLink>
      <PageHeader eyebrow="Équipe" title={`Supprimer ${heading}`} />
      <DeleteEntry
        collection="team"
        id={member.id}
        question={`Supprimer « ${heading} » de l’équipe ?`}
        consequence="La fiche disparaît du back-office et de la page « Notre équipe ». Le portrait reste dans la médiathèque : il n’est pas supprimé avec elle."
        doneHref="/admin/equipe"
        cancelHref={`/admin/equipe/${member.id}`}
        summary={
          <dl>
            <DataRow label="Monogramme" value={member.initials} />
            <DataRow label="Titre" value={member.fr.title} />
            <DataRow label="Présentation" value={member.fr.summary} />
          </dl>
        }
      />
    </>
  );
}
