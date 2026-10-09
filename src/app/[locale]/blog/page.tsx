import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {BlogList} from '@/components/blog/BlogList';
import {PageHero} from '@/components/sections/PageHero';
import {Container} from '@/components/ui/Container';
import {BLOG_BASE_PATH, FALLBACK_BLOG_CATEGORIES, type BlogCategory} from '@/content/blog';
import {listArticles} from '@/lib/api/articles';
import {liveThemes} from '@/lib/content/live';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'blog'});

  return pageMetadata(
    {title: t('metaTitle'), description: t('metaDescription')},
    {locale, path: BLOG_BASE_PATH},
  );
}

export default async function BlogIndexPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'blog'});
  const {articles} = await listArticles(locale);

  // Le repli garde les traductions des huit thèmes d'origine : une API muette
  // ne doit pas faire retomber le blog anglais en français.
  const fallback: BlogCategory[] = FALLBACK_BLOG_CATEGORIES.map((category) => ({
    id: category.id,
    label: t(`categories.${category.id}.label`),
    short: t(`categories.${category.id}.short`),
  }));
  const categories = await liveThemes(locale, fallback);

  return (
    <>
      <PageHero
        hero={{
          eyebrow: t('heroEyebrow'),
          title: t('heroTitle'),
          intro: t('heroIntro'),
          image: {src: '/images/blog-hero.webp', alt: t('heroImageAlt')},
        }}
      />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <BlogList articles={articles} categories={categories} />
        </Container>
      </section>
    </>
  );
}
