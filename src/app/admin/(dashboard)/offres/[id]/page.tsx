import type {Metadata} from 'next';
import type {ReactNode} from 'react';
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
import {CONTRACT_TYPE_LABELS} from '@/lib/constants';
import {mediaFileUrl} from '@/lib/media/url';

type Props = {params: Promise<{id: string}>};

/**
 * Missions et profil sont des listes de lignes : les montrer en puces, et non
 * recollées en une phrase, c'est les relire comme la page Carrières les
 * affiche. Une liste vide vaut « absente », donc `DataRow` met son tiret.
 */
function lines(items?: string[]): ReactNode {
  if (!items || items.length === 0) return undefined;
  return (
    <ul className="list-disc space-y-1 pl-4">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const job = await getCollectionEntry('jobs', id);
  return {title: job ? job.fr.title : 'Offre d’emploi'};
}

export default async function JobEntryPage({params}: Props) {
  const {id} = await params;
  const job = await getCollectionEntry('jobs', id);
  if (!job) notFound();

  const media = job.mediaId ? await getMedia(job.mediaId) : null;

  return (
    <>
      <BackLink href="/admin/offres">Offres d’emploi</BackLink>
      <PageHeader
        eyebrow="Offres d’emploi"
        title={job.fr.title}
        description={
          job.status === 'publie'
            ? 'Visible sur la page Carrières, ouverte aux candidatures.'
            : 'Brouillon : absente de la page Carrières.'
        }
        actions={<StatusPill status={job.status} />}
      />

      <EntryViewShell
        editHref={`/admin/offres/${job.id}/modifier`}
        aside={
          <>
            <Panel title="Visuel">
              {media ? (
                <div className="grid gap-3">
                  <MediaPreview media={media} src={mediaFileUrl(media.id)} fit="cover" className="max-w-xs" />
                  <MediaFacts media={media} />
                </div>
              ) : job.legacyImagePath ? (
                <div className="grid gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element -- visuel livré avec le site */}
                  <img
                    src={job.legacyImagePath}
                    alt=""
                    className="aspect-16/10 max-w-xs rounded-xl bg-lokambe-peach-soft object-cover"
                  />
                  <p className="text-xs text-ink-soft">Visuel livré avec le site ({job.legacyImagePath}).</p>
                </div>
              ) : (
                <MediaEmpty label="Aucun visuel : la page Carrières n’en affiche pas." className="max-w-xs" />
              )}
            </Panel>

            <Panel title="Actions">
              <EntryStatusActions collection="jobs" id={job.id} status={job.status} />
              <div className="mt-2.5">
                <AdminButtonLink tone="danger" href={`/admin/offres/${job.id}/supprimer`} className="w-full">
                  Supprimer
                </AdminButtonLink>
              </div>
            </Panel>
          </>
        }
      >
        <DataRow label="Titre (fr)" value={job.fr.title} />
        <DataRow label="Adresse de la fiche" value={job.slug} />
        <DataRow label="Lieu" value={job.location} />
        <DataRow label="Type de contrat" value={CONTRACT_TYPE_LABELS[job.contractType]} />
        <DataRow label="Rang d’affichage" value={String(job.order + 1)} />
        <DataRow label="Résumé (fr)" value={job.fr.summary} />
        <DataRow label="Missions (fr)" value={lines(job.fr.missions)} />
        <DataRow label="Profil (fr)" value={lines(job.fr.profile)} />
        <DataRow label="Titre (en)" value={job.en?.title} />
        <DataRow label="Résumé (en)" value={job.en?.summary} />
        <DataRow label="Missions (en)" value={lines(job.en?.missions)} />
        <DataRow label="Profil (en)" value={lines(job.en?.profile)} />
        <DataRow label="Dernière modification" value={formatDateTime(job.updatedAt)} />
      </EntryViewShell>
    </>
  );
}
