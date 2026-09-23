import type {Metadata} from 'next';
import {ArticleForm} from '@/components/admin/ArticleForm';
import {PageHeader} from '@/components/admin/PageHeader';

export const metadata: Metadata = {title: 'Nouvel article'};

export default function NewArticlePage() {
  return (
    <>
      <PageHeader
        eyebrow="Articles"
        title="Nouvel article"
        description="Rédigez, enregistrez en brouillon, publiez quand le texte est prêt."
      />
      <ArticleForm />
    </>
  );
}
