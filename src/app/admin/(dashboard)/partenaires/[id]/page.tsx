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
  const partner = await getCollectionEntry('partners', id);
  return {title: partner ? partner.name : 'Partenaire'};
}

export default async function PartnerEntryPage({params}: Props) {
  const {id} = await params;
  const partner = await getCollectionEntry('partners', id);
  if (!partner) notFound();

  const media = partner.mediaId ? await getMedia(partner.mediaId) : null;

  return (
    <>
      <BackLink href="/admin/partenaires">Partenaires</BackLink>
      <PageHeader
        eyebrow="Partenaires"
        title={partner.name}
        description={
          partner.status === 'publie'
            ? 'Visible dans le mur des partenaires, sur la page d’accueil.'
            : 'Brouillon : absent de la page d’accueil. Sans aucun partenaire publié, la section entière reste masquée.'
        }
        actions={<StatusPill status={partner.status} />}
      />

      <EntryViewShell
        editHref={`/admin/partenaires/${partner.id}/modifier`}
        aside={
          <>
            <Panel title="Logo">
              {media ? (
                <div className="grid gap-3">
                  <MediaPreview media={media} src={mediaFileUrl(media.id)} fit="contain" className="max-w-xs" />
                  <MediaFacts media={media} />
                </div>
              ) : partner.legacyImagePath ? (
                <div className="grid gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element -- logo livré avec le site */}
                  <img
                    src={partner.legacyImagePath}
                    alt=""
                    className="aspect-16/10 max-w-xs rounded-xl bg-lokambe-peach-soft object-contain p-3"
                  />
                  <p className="text-xs text-ink-soft">Logo livré avec le site ({partner.legacyImagePath}).</p>
                </div>
              ) : (
                <MediaEmpty label="Aucun logo : le site affiche les initiales." className="max-w-xs" />
              )}
            </Panel>

            <Panel title="Actions">
              <EntryStatusActions collection="partners" id={partner.id} status={partner.status} />
              <div className="mt-2.5">
                <AdminButtonLink tone="danger" href={`/admin/partenaires/${partner.id}/supprimer`} className="w-full">
                  Supprimer
                </AdminButtonLink>
              </div>
            </Panel>
          </>
        }
      >
        <DataRow label="Nom" value={partner.name} />
        <DataRow label="Adresse de la fiche" value={partner.slug} />
        <DataRow
          label="Site"
          value={
            partner.websiteUrl ? (
              <a
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-lokambe-blue hover:underline"
              >
                {partner.websiteUrl}
              </a>
            ) : undefined
          }
        />
        <DataRow label="Rang d’affichage" value={String(partner.order + 1)} />
        <DataRow label="Description (fr)" value={partner.fr?.description} />
        <DataRow label="Description (en)" value={partner.en?.description} />
        <DataRow label="Dernière modification" value={formatDateTime(partner.updatedAt)} />
      </EntryViewShell>
    </>
  );
}
