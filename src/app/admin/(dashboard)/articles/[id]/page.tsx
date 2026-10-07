import type {Metadata} from 'next';
import NextImage from 'next/image';
import {notFound} from 'next/navigation';
import {AdminButtonLink, BackLink} from '@/components/admin/AdminButton';
import {StatusPill} from '@/components/admin/CollectionBrowser';
import {ArticleStatusActions} from '@/components/admin/ArticleStatusActions';
import {EntryViewShell} from '@/components/admin/form/EntryViewShell';
import {MediaEmpty} from '@/components/admin/form/MediaPreview';
import {PageHeader} from '@/components/admin/PageHeader';
import {DataRow, Panel} from '@/components/admin/Surface';
import {blogCategories} from '@/content/blog';
import {formatDate, formatDateTime} from '@/lib/admin-format';
import {getAdminArticle} from '@/lib/api/admin';
import {mediaPath} from '@/lib/blog/article';

type Props = {params: Promise<{id: string}>};

function categoryLabel(id: string): string {
  return blogCategories.find((category) => category.id === id)?.label ?? id;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {id} = await params;
  const article = await getAdminArticle(id);
  return {title: article ? article.title : 'Article'};
}

export default async function ArticlePage({params}: Props) {
  const {id} = await params;
  const article = await getAdminArticle(id);
  if (!article) notFound();

  return (
    <>
      <BackLink href="/admin/articles">Articles</BackLink>
      <PageHeader
        eyebrow="Articles"
        title={article.title}
        description={
          article.status === 'publie'
            ? `En ligne sur /blog/${article.slug}`
            : 'Brouillon : visible seulement dans le back-office.'
        }
        actions={<StatusPill status={article.status} />}
      />

      <EntryViewShell
        editHref={`/admin/articles/${article.id}/modifier`}
        editLabel="Modifier l’article"
        aside={
          <>
            <Panel title="Couverture">
              {article.coverFileId ? (
                <div className="grid gap-3">
                  <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-lokambe-peach-soft">
                    <NextImage
                      src={mediaPath(article.coverFileId)}
                      alt={article.coverAlt ?? ''}
                      fill
                      sizes="20rem"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  {article.coverAlt ? null : (
                    <p className="text-xs font-bold text-lokambe-red-strong">Texte alternatif manquant.</p>
                  )}
                </div>
              ) : (
                <MediaEmpty label="Sans couverture : le site affiche une photo correspondant au thème." />
              )}
            </Panel>

            <Panel title="Actions">
              <ArticleStatusActions id={article.id} status={article.status} />
              <div className="mt-2.5 grid gap-2.5">
                {article.status === 'publie' ? (
                  <AdminButtonLink tone="neutre" href={`/fr/blog/${article.slug}`} className="w-full">
                    Lire sur le site
                  </AdminButtonLink>
                ) : null}
                <AdminButtonLink tone="danger" href={`/admin/articles/${article.id}/supprimer`} className="w-full">
                  Supprimer
                </AdminButtonLink>
              </div>
            </Panel>
          </>
        }
      >
        <DataRow label="Titre" value={article.title} />
        <DataRow label="Adresse publique" value={`/blog/${article.slug}`} />
        <DataRow label="Chapô" value={article.excerpt} />
        <DataRow label="Thème" value={categoryLabel(article.category)} />
        <DataRow label="Signature" value={article.author} />
        <DataRow label="Langue" value={article.locale === 'en' ? 'Anglais' : 'Français'} />
        <DataRow label="Temps de lecture" value={`${article.readingMinutes} min`} />
        <DataRow
          label="Première publication"
          value={article.publishedAt ? formatDate(article.publishedAt) : undefined}
        />
        <DataRow label="Article d’exemple" value={article.isExample ? 'Oui' : 'Non'} />
        <DataRow label="Dernière modification" value={formatDateTime(article.updatedAt)} />
      </EntryViewShell>
    </>
  );
}
