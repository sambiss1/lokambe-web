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
  const partner = await getCollectionEntry('partners', id);
  return {title: partner ? `Supprimer ${partner.name}` : 'Supprimer'};
}

export default async function DeletePartnerPage({params}: Props) {
  const {id} = await params;
  const partner = await getCollectionEntry('partners', id);
  if (!partner) notFound();

  return (
    <>
      <BackLink href={`/admin/partenaires/${partner.id}`}>{partner.name}</BackLink>
      <PageHeader eyebrow="Partenaires" title={`Supprimer ${partner.name}`} />
      <DeleteEntry
        collection="partners"
        id={partner.id}
        question={`Supprimer « ${partner.name} » des partenaires ?`}
        consequence="La fiche disparaît du back-office et du mur des partenaires. S’il était le dernier publié, la section entière disparaît de la page d’accueil. Le logo reste dans la médiathèque : il n’est pas supprimé avec elle."
        doneHref="/admin/partenaires"
        cancelHref={`/admin/partenaires/${partner.id}`}
        summary={
          <dl>
            <DataRow label="Adresse de la fiche" value={partner.slug} />
            <DataRow label="Site" value={partner.websiteUrl} />
            <DataRow label="Description" value={partner.fr?.description} />
          </dl>
        }
      />
    </>
  );
}
