import type {Metadata} from 'next';
import {ArticleForm} from '@/components/admin/ArticleForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {adminThemeOptions} from '@/lib/api/admin-content';

export const metadata: Metadata = {title: 'Nouvel article'};

export default async function NewArticlePage() {
  const themes = await adminThemeOptions();

  return (
    <>
      <PageHeader
        eyebrow="Articles"
        title="Nouvel article"
        description="Rédigez, enregistrez en brouillon, publiez quand le texte est prêt."
      />
      <ArticleForm themes={themes} />
    </>
  );
}
