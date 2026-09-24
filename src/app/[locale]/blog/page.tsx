import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {BlogList} from '@/components/blog/BlogList';
import {CtaBanner} from '@/components/sections/CtaBanner';
import {PageHero} from '@/components/sections/PageHero';
import {Container} from '@/components/ui/Container';
import {BLOG_BASE_PATH, blogPage} from '@/content/blog';
import {listArticles} from '@/lib/api/articles';
import {pageMetadata} from '@/lib/seo';

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return pageMetadata(blogPage.meta, {locale, path: BLOG_BASE_PATH});
}

export default async function BlogIndexPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const {articles} = await listArticles();

  return (
    <>
      <PageHero hero={blogPage.hero} />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <BlogList articles={articles} />
        </Container>
      </section>

      <CtaBanner cta={blogPage.cta} />
    </>
  );
}
