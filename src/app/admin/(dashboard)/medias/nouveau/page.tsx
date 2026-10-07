import type {Metadata} from 'next';
import {BackLink} from '@/components/admin/AdminButton';
import {MediaUploader} from '@/components/admin/media/MediaUploader';
import {PageHeader} from '@/components/admin/PageHeader';

export const metadata: Metadata = {title: 'Téléverser un média'};

export default function NewMediaPage() {
  return (
    <>
      <BackLink href="/admin/medias">Médiathèque</BackLink>
      <PageHeader
        eyebrow="Médiathèque"
        title="Téléverser un média"
        description="Choisissez un fichier : son aperçu s’affiche ici avant l’envoi, photo comme vidéo."
      />
      <MediaUploader />
    </>
  );
}
