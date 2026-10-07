import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {ArticleForm} from '@/components/admin/ArticleForm';
import {PageHeader} from '@/components/admin/PageHeader';
import {getAdminArticle} from '@/lib/api/admin';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const article = await getAdminArticle(id);
  return {title: article ? `Modifier ${article.title}` : 'Article'};
}

export default async function EditArticlePage({params}: Props) {
  const {id} = await params;
  const article = await getAdminArticle(id);
  if (!article) notFound();

  return (
    <>
      <BackLink href={`/admin/articles/${article.id}`}>{article.title}</BackLink>
      <PageHeader
        eyebrow="Articles"
        title={`Modifier ${article.title}`}
        description={
          article.status === 'publie'
            ? `En ligne sur /blog/${article.slug}`
            : 'Brouillon : visible seulement dans le back-office.'
        }
      />
      <ArticleForm article={article} />
    </>
  );
}
