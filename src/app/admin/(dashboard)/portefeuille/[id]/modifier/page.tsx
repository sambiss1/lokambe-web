import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {PortfolioForm} from '@/components/admin/collections/PortfolioForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {getCollectionEntry, getMedia, listMedia} from '@/lib/api/admin-content';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const company = await getCollectionEntry('portfolio', id);
  return {title: company ? `Modifier ${company.name}` : 'Entreprise'};
}

export default async function EditPortfolioPage({params}: Props) {
  const {id} = await params;
  const company = await getCollectionEntry('portfolio', id);
  if (!company) notFound();

  const [library, media] = await Promise.all([
    listMedia({kind: 'image'}, 100),
    company.mediaId ? getMedia(company.mediaId) : Promise.resolve(null),
  ]);

  return (
    <>
      <BackLink href={`/admin/portefeuille/${company.id}`}>{company.name}</BackLink>
      <PageHeader
        eyebrow="Portefeuille"
        title={`Modifier ${company.name}`}
        description="Les champs anglais laissés vides reprennent le français sur /en."
      />
      <PortfolioForm company={company} library={library.items} media={media} />
    </>
  );
}
