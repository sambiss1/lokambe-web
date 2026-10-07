import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {MediaForm} from '@/components/admin/media/MediaForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {getMedia, listMedia} from '@/lib/api/admin-content';

type Props = {params: Promise<{id: string}>};

function nameOf(media: {title?: string; originalName: string}): string {
  return media.title ?? media.originalName;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const media = await getMedia(id);
  return {title: media ? `Modifier ${nameOf(media)}` : 'Média'};
}

export default async function EditMediaPage({params}: Props) {
  const {id} = await params;
  const media = await getMedia(id);
  if (!media) notFound();

  // Les images d'attente ne concernent que les vidéos : inutile de charger la
  // bibliothèque de photos pour une photo.
  const posters = media.kind === 'video' ? await listMedia({kind: 'image'}, 100) : {items: []};

  return (
    <>
      <BackLink href={`/admin/medias/${media.id}`}>{nameOf(media)}</BackLink>
      <PageHeader
        eyebrow="Médiathèque"
        title={`Modifier ${nameOf(media)}`}
        description="Le fichier ne se remplace pas : téléversez-en un nouveau et reposez-le là où il faut."
      />
      <MediaForm media={media} posters={posters.items} />
    </>
  );
}
