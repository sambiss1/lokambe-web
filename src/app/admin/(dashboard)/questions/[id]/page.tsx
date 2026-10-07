import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {AdminButtonLink, BackLink} from '@/components/admin/AdminButton';
import {StatusPill} from '@/components/admin/CollectionBrowser';
import {EntryStatusActions} from '@/components/admin/form/EntryStatusActions';
import {EntryViewShell} from '@/components/admin/form/EntryViewShell';
import {PageHeader} from '@/components/admin/PageHeader';
import {DataRow, Panel} from '@/components/admin/Surface';
import {getCollectionEntry} from '@/lib/api/admin-content';
import {formatDateTime} from '@/lib/admin-format';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const entry = await getCollectionEntry('faq', id);
  return {title: entry ? entry.fr.question : 'Question'};
}

export default async function FaqEntryPage({params}: Props) {
  const {id} = await params;
  const entry = await getCollectionEntry('faq', id);
  if (!entry) notFound();

  return (
    <>
      <BackLink href="/admin/questions">Questions fréquentes</BackLink>
      <PageHeader
        eyebrow="Questions fréquentes"
        title={entry.fr.question}
        description={
          entry.status === 'publie'
            ? 'Visible dans les questions fréquentes, sur la page Contact.'
            : 'Brouillon : absente de la page Contact.'
        }
        actions={<StatusPill status={entry.status} />}
      />

      <EntryViewShell
        editHref={`/admin/questions/${entry.id}/modifier`}
        // Un seul panneau : sans image, il n'y a pas d'aperçu de média à montrer.
        aside={
          <Panel title="Actions">
            <EntryStatusActions collection="faq" id={entry.id} status={entry.status} />
            <div className="mt-2.5">
              <AdminButtonLink tone="danger" href={`/admin/questions/${entry.id}/supprimer`} className="w-full">
                Supprimer
              </AdminButtonLink>
            </div>
          </Panel>
        }
      >
        <DataRow label="Question (fr)" value={entry.fr.question} />
        <DataRow label="Réponse (fr)" value={entry.fr.answer} />
        <DataRow label="Adresse de la fiche" value={entry.slug} />
        <DataRow label="Rang d’affichage" value={String(entry.order + 1)} />
        <DataRow label="Question (en)" value={entry.en?.question} />
        <DataRow label="Réponse (en)" value={entry.en?.answer} />
        <DataRow label="Dernière modification" value={formatDateTime(entry.updatedAt)} />
      </EntryViewShell>
    </>
  );
}
