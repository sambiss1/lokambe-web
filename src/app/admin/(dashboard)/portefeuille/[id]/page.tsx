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
  const company = await getCollectionEntry('portfolio', id);
  return {title: company ? company.name : 'Entreprise'};
}

export default async function PortfolioEntryPage({params}: Props) {
  const {id} = await params;
  const company = await getCollectionEntry('portfolio', id);
  if (!company) notFound();

  const media = company.mediaId ? await getMedia(company.mediaId) : null;

  return (
    <>
      <BackLink href="/admin/portefeuille">Portefeuille</BackLink>
      <PageHeader
        eyebrow="Portefeuille"
        title={company.name}
        description={
          company.status === 'publie'
            ? 'Visible dans le portefeuille, sur la page d’accueil.'
            : 'Brouillon : absente de la page d’accueil.'
        }
        actions={<StatusPill status={company.status} />}
      />

      <EntryViewShell
        editHref={`/admin/portefeuille/${company.id}/modifier`}
        aside={
          <>
            <Panel title="Logo">
              {media ? (
                <div className="grid gap-3">
                  <MediaPreview media={media} src={mediaFileUrl(media.id)} fit="contain" className="max-w-xs" />
                  <MediaFacts media={media} />
                </div>
              ) : company.legacyImagePath ? (
                <div className="grid gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element -- logo livré avec le site */}
                  <img
                    src={company.legacyImagePath}
                    alt=""
                    className="aspect-16/10 max-w-xs rounded-xl bg-lokambe-peach-soft object-contain p-3"
                  />
                  <p className="text-xs text-ink-soft">Logo livré avec le site ({company.legacyImagePath}).</p>
                </div>
              ) : (
                <MediaEmpty label="Aucun logo : le site affiche les initiales." className="max-w-xs" />
              )}
            </Panel>

            <Panel title="Actions">
              <EntryStatusActions collection="portfolio" id={company.id} status={company.status} />
              <div className="mt-2.5">
                <AdminButtonLink tone="danger" href={`/admin/portefeuille/${company.id}/supprimer`} className="w-full">
                  Supprimer
                </AdminButtonLink>
              </div>
            </Panel>
          </>
        }
      >
        <DataRow label="Nom" value={company.name} />
        <DataRow label="Adresse de la fiche" value={company.slug} />
        <DataRow
          label="Site"
          value={
            company.websiteUrl ? (
              <a
                href={company.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-lokambe-blue hover:underline"
              >
                {company.websiteUrl}
              </a>
            ) : undefined
          }
        />
        <DataRow label="Rang d’affichage" value={String(company.order + 1)} />
        <DataRow label="Secteur (fr)" value={company.fr.sector} />
        <DataRow label="Statut du projet (fr)" value={company.fr.status} />
        <DataRow label="Description (fr)" value={company.fr.description} />
        <DataRow label="Secteur (en)" value={company.en?.sector} />
        <DataRow label="Statut du projet (en)" value={company.en?.status} />
        <DataRow label="Description (en)" value={company.en?.description} />
        <DataRow label="Dernière modification" value={formatDateTime(company.updatedAt)} />
      </EntryViewShell>
    </>
  );
}
