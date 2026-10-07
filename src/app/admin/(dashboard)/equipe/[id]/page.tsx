import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {AdminButtonLink, BackLink} from '@/components/admin/AdminButton';
import {StatusPill} from '@/components/admin/CollectionBrowser';
import {EntryStatusActions} from '@/components/admin/form/EntryStatusActions';
import {EntryViewShell} from '@/components/admin/form/EntryViewShell';
import {MediaEmpty, MediaFacts, MediaPreview} from '@/components/admin/form/MediaPreview';
import {PageHeader} from '@/components/admin/PageHeader';
import {DataRow, Panel} from '@/components/admin/Surface';
import {getCollectionEntry, getMedia} from '@/lib/api/admin-content';
import {formatDateTime} from '@/lib/admin-format';
import {mediaFileUrl} from '@/lib/media/url';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const member = await getCollectionEntry('team', id);
  return {title: member ? (member.name ?? member.fr.title) : 'Membre'};
}

export default async function TeamEntryPage({params}: Props) {
  const {id} = await params;
  const member = await getCollectionEntry('team', id);
  if (!member) notFound();

  const media = member.mediaId ? await getMedia(member.mediaId) : null;
  // Le nom n’est publié que pour le dirigeant : sinon la fiche porte son rôle.
  const heading = member.name ?? member.fr.title;

  return (
    <>
      <BackLink href="/admin/equipe">Équipe</BackLink>
      <PageHeader
        eyebrow="Équipe"
        title={heading}
        description={
          member.status === 'publie'
            ? 'Visible sur la page « Notre équipe ».'
            : 'Brouillon : absent de la page « Notre équipe ».'
        }
        actions={<StatusPill status={member.status} />}
      />

      <EntryViewShell
        editHref={`/admin/equipe/${member.id}/modifier`}
        aside={
          <>
            <Panel title="Portrait">
              {media ? (
                <div className="grid gap-3">
                  <MediaPreview media={media} src={mediaFileUrl(media.id)} fit="cover" className="max-w-xs" />
                  <MediaFacts media={media} />
                </div>
              ) : member.legacyImagePath ? (
                <div className="grid gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element -- portrait livré avec le site */}
                  <img
                    src={member.legacyImagePath}
                    alt=""
                    className="aspect-16/10 max-w-xs rounded-xl bg-lokambe-peach-soft object-cover"
                  />
                  <p className="text-xs text-ink-soft">Portrait livré avec le site ({member.legacyImagePath}).</p>
                </div>
              ) : (
                <MediaEmpty label="Aucun portrait : le site affiche le monogramme." className="max-w-xs" />
              )}
            </Panel>

            <Panel title="Actions">
              <EntryStatusActions collection="team" id={member.id} status={member.status} />
              <div className="mt-2.5">
                <AdminButtonLink tone="danger" href={`/admin/equipe/${member.id}/supprimer`} className="w-full">
                  Supprimer
                </AdminButtonLink>
              </div>
            </Panel>
          </>
        }
      >
        <DataRow label="Nom" value={member.name} />
        <DataRow label="Monogramme" value={member.initials} />
        <DataRow label="Adresse de la fiche" value={member.slug} />
        <DataRow label="Rang d’affichage" value={String(member.order + 1)} />
        <DataRow label="Titre (fr)" value={member.fr.title} />
        <DataRow label="Présentation (fr)" value={member.fr.summary} />
        <DataRow label="Description du portrait (fr)" value={member.fr.photoAlt} />
        <DataRow label="Titre (en)" value={member.en?.title} />
        <DataRow label="Présentation (en)" value={member.en?.summary} />
        <DataRow label="Description du portrait (en)" value={member.en?.photoAlt} />
        <DataRow label="Dernière modification" value={formatDateTime(member.updatedAt)} />
      </EntryViewShell>
    </>
  );
}
