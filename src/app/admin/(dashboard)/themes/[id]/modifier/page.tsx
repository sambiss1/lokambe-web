import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {ThemeForm} from '@/components/admin/collections/ThemeForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {getCollectionEntry} from '@/lib/api/admin-content';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const entry = await getCollectionEntry('themes', id);
  return {title: entry ? `Modifier « ${entry.fr.name} »` : 'Thème'};
}

export default async function EditThemePage({params}: Props) {
  const {id} = await params;
  const entry = await getCollectionEntry('themes', id);
  if (!entry) notFound();

  return (
    <>
      <BackLink href={`/admin/themes/${entry.id}`}>{entry.fr.name}</BackLink>
      <PageHeader
        eyebrow="Thèmes"
        title={`Modifier « ${entry.fr.name} »`}
        description="Changer l’adresse du thème change l’adresse du blog filtré, et reclasse les articles qui le portent."
      />
      <ThemeForm entry={entry} />
    </>
  );
}
