import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {DeleteMedia} from '@/components/admin/media/DeleteMedia';
import {PageHeader} from '@/components/admin/PageHeader';
import {DataRow} from '@/components/admin/Surface';
import {getMedia, getMediaUsage} from '@/lib/api/admin-content';
import {formatMediaSize} from '@/lib/media/url';

type Props = {params: Promise<{id: string}>};

function nameOf(media: {title?: string; originalName: string}): string {
  return media.title ?? media.originalName;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const media = await getMedia(id);
  return {title: media ? `Supprimer ${nameOf(media)}` : 'Supprimer'};
}

export default async function DeleteMediaPage({params}: Props) {
  const {id} = await params;
  const media = await getMedia(id);
  if (!media) notFound();

  // L'API refuserait de toute façon (409) : autant le dire avant de cliquer.
  const usage = await getMediaUsage(media.id);

  return (
    <>
      <BackLink href={`/admin/medias/${media.id}`}>{nameOf(media)}</BackLink>
      <PageHeader eyebrow="Médiathèque" title={`Supprimer ${nameOf(media)}`} />
      <DeleteMedia
        id={media.id}
        name={nameOf(media)}
        kind={media.kind}
        usage={usage}
        summary={
          <dl>
            <DataRow label="Genre" value={media.kind === 'video' ? 'Vidéo' : 'Photo'} />
            <DataRow label="Fichier" value={media.originalName} />
            <DataRow label="Poids" value={formatMediaSize(media.size)} />
            <DataRow label="Texte alternatif" value={media.alt} />
          </dl>
        }
      />
    </>
  );
}
