import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {BlogList} from '@/components/blog/BlogList';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {PageHero} from '@/components/sections/PageHero';
import {Container} from '@/components/ui/Container';
import {BLOG_BASE_PATH} from '@/content/blog';
import {listArticles} from '@/lib/api/articles';
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
          <BlogList articles={articles} />
        </Container>
      </section>

      <CtaBanner
        cta={{
          title: t('ctaTitle'),
          text: t('ctaText'),
          primary: {label: t('ctaPrimary'), href: '/soumettre-un-projet'},
          secondary: {label: t('ctaSecondary'), href: '/contact'},
        }}
      />
    </>
  );
}
