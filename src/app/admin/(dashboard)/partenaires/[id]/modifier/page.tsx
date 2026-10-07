import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {PartnerForm} from '@/components/admin/collections/PartnerForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {getCollectionEntry, getMedia, listMedia} from '@/lib/api/admin-content';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const partner = await getCollectionEntry('partners', id);
  return {title: partner ? `Modifier ${partner.name}` : 'Partenaire'};
}

export default async function EditPartnerPage({params}: Props) {
  const {id} = await params;
  const partner = await getCollectionEntry('partners', id);
  if (!partner) notFound();

  const [library, media] = await Promise.all([
    listMedia({kind: 'image'}, 100),
    partner.mediaId ? getMedia(partner.mediaId) : Promise.resolve(null),
  ]);

  return (
    <>
      <BackLink href={`/admin/partenaires/${partner.id}`}>{partner.name}</BackLink>
      <PageHeader
        eyebrow="Partenaires"
        title={`Modifier ${partner.name}`}
        description="Les champs anglais laissés vides reprennent le français sur /en."
      />
      <PartnerForm partner={partner} library={library.items} media={media} />
    </>
  );
}
