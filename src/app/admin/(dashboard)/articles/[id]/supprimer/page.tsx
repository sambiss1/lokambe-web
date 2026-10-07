import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BackLink} from '@/components/admin/AdminButton';
import {DeleteArticle} from '@/components/admin/DeleteArticle';
import {PageHeader} from '@/components/admin/PageHeader';
import {DataRow} from '@/components/admin/Surface';
import {getAdminArticle} from '@/lib/api/admin';

type Props = {params: Promise<{id: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const article = await getAdminArticle(id);
  return {title: article ? `Supprimer ${article.title}` : 'Supprimer'};
}

export default async function DeleteArticlePage({params}: Props) {
  const {id} = await params;
  const article = await getAdminArticle(id);
  if (!article) notFound();

  return (
    <>
      <BackLink href={`/admin/articles/${article.id}`}>{article.title}</BackLink>
      <PageHeader eyebrow="Articles" title={`Supprimer « ${article.title} »`} />
      <DeleteArticle
        id={article.id}
        title={article.title}
        published={article.status === 'publie'}
        summary={
          <dl>
            <DataRow label="Adresse publique" value={`/blog/${article.slug}`} />
            <DataRow label="Chapô" value={article.excerpt} />
          </dl>
        }
      />
    </>
  );
}
