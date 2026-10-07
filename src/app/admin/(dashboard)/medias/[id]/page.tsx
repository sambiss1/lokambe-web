import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {AdminButtonLink, BackLink} from '@/components/admin/AdminButton';
import {EntryViewShell} from '@/components/admin/form/EntryViewShell';
import {MediaFacts, MediaPreview} from '@/components/admin/form/MediaPreview';
import {PageHeader} from '@/components/admin/PageHeader';
import {DataRow, Panel} from '@/components/admin/Surface';
import {getMedia, getMediaUsage} from '@/lib/api/admin-content';
import {formatDateTime} from '@/lib/admin-format';
import {formatDuration, formatMediaSize, mediaFileUrl} from '@/lib/media/url';

type Props = {params: Promise<{id: string}>};

function nameOf(media: {title?: string; originalName: string}): string {
  return media.title ?? media.originalName;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const media = await getMedia(id);
  return {title: media ? nameOf(media) : 'Média'};
}

export default async function MediaEntryPage({params}: Props) {
  const {id} = await params;
  const media = await getMedia(id);
  if (!media) notFound();

  // Où ce média sert : c'est ce qui décide s'il peut être supprimé.
  const usage = await getMediaUsage(media.id);

  return (
    <>
      <BackLink href="/admin/medias">Médiathèque</BackLink>
      <PageHeader
        eyebrow="Médiathèque"
        title={nameOf(media)}
        description={media.kind === 'video' ? 'Vidéo de la bibliothèque.' : 'Photo de la bibliothèque.'}
      />

      <EntryViewShell
        editHref={`/admin/medias/${media.id}/modifier`}
        aside={
          <>
            <Panel title="Aperçu">
              <div className="grid gap-3">
                <MediaPreview
                  media={media}
                  src={mediaFileUrl(media.id)}
                  poster={media.posterMediaId ? mediaFileUrl(media.posterMediaId) : undefined}
                />
                <MediaFacts media={media} />
                <a
                  href={mediaFileUrl(media.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-xs font-bold text-lokambe-blue hover:underline"
                >
                  Ouvrir le fichier dans un onglet
                </a>
              </div>
            </Panel>

            <Panel title="Utilisé par">
              {usage.length === 0 ? (
                <p className="text-sm text-ink-soft">
                  Nulle part pour l’instant : ce média peut être supprimé sans rien casser.
                </p>
              ) : (
                <ul className="grid gap-1.5 text-sm text-ink">
                  {usage.map((place) => (
                    <li key={place.label}>
                      {place.label} — {place.count} fiche{place.count > 1 ? 's' : ''}
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel title="Actions">
              <AdminButtonLink tone="danger" href={`/admin/medias/${media.id}/supprimer`} className="w-full">
                Supprimer
              </AdminButtonLink>
            </Panel>
          </>
        }
      >
        <DataRow label="Titre" value={media.title} />
        <DataRow label="Texte alternatif" value={media.alt} />
        <DataRow label="Genre" value={media.kind === 'video' ? 'Vidéo' : 'Photo'} />
        <DataRow label="Format" value={media.mimeType} />
        <DataRow label="Poids" value={formatMediaSize(media.size)} />
        <DataRow
          label="Dimensions"
          value={media.width && media.height ? `${media.width} × ${media.height} px` : undefined}
        />
        <DataRow
          label="Durée"
          value={media.durationSeconds !== undefined ? formatDuration(media.durationSeconds) : undefined}
        />
        <DataRow
          label="Image d’attente"
          value={
            media.posterMediaId ? (
              <Link
                href={`/admin/medias/${media.posterMediaId}`}
                className="font-bold text-lokambe-blue hover:underline"
              >
                Voir la photo utilisée
              </Link>
            ) : undefined
          }
        />
        <DataRow label="Fichier d’origine" value={media.originalName} />
        <DataRow label="Téléversé par" value={media.uploadedBy} />
        <DataRow label="Téléversé le" value={formatDateTime(media.createdAt)} />
      </EntryViewShell>
    </>
  );
}
