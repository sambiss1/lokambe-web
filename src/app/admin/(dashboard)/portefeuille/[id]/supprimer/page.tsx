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
  const company = await getCollectionEntry('portfolio', id);
  return {title: company ? `Supprimer ${company.name}` : 'Supprimer'};
}

export default async function DeletePortfolioPage({params}: Props) {
  const {id} = await params;
  const company = await getCollectionEntry('portfolio', id);
  if (!company) notFound();

  return (
    <>
      <BackLink href={`/admin/portefeuille/${company.id}`}>{company.name}</BackLink>
      <PageHeader eyebrow="Portefeuille" title={`Supprimer ${company.name}`} />
      <DeleteEntry
        collection="portfolio"
        id={company.id}
        question={`Supprimer « ${company.name} » du portefeuille ?`}
        consequence="La fiche disparaît du back-office et de la page d’accueil. Le logo reste dans la médiathèque : il n’est pas supprimé avec elle."
        doneHref="/admin/portefeuille"
        cancelHref={`/admin/portefeuille/${company.id}`}
        summary={
          <dl>
            <DataRow label="Secteur" value={company.fr.sector} />
            <DataRow label="Statut" value={company.fr.status} />
            <DataRow label="Description" value={company.fr.description} />
          </dl>
        }
      />
    </>
  );
}
