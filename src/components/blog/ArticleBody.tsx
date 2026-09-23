import Image from 'next/image';
import {BLOG_EXAMPLE_NOTICE, blogPage} from '@/content/blog';
import {withHeadingAnchors} from '@/lib/blog/article';
import type {Article} from '@/lib/blog/article';
import {Reveal} from '../motion/Reveal';
import {Container} from '../ui/Container';
import {Eyebrow} from '../ui/Eyebrow';

/**
 * Corps d’un article : couverture, sommaire ancré et texte.
 *
 * Le texte est du HTML écrit dans le back-office et **nettoyé par l’API** avant
 * enregistrement : la base ne contient ni script, ni attribut d’événement, ni
 * lien exécutable. Sa mise en forme vient des règles `.article-rich`.
 */
export function ArticleBody({article}: {article: Article}) {
  const {html, toc} = withHeadingAnchors(article.html);

  // `flow-root` empêche la marge négative de l’image de remonter le fond blanc.
  return (
    <div className="flow-root bg-white pb-20 sm:pb-28">
      <Container>
        <Reveal className="relative -mt-16 sm:-mt-20 lg:-mt-24">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-lokambe-peach-soft sm:aspect-[16/8] sm:rounded-[2.5rem]">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              fill
              priority
              sizes="(min-width: 1320px) 1224px, 92vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-14">
          {toc.length > 0 && (
            <aside className="hidden lg:col-span-4 lg:block">
              <nav aria-label={blogPage.tocLabel} className="lg:sticky lg:top-32">
                <Eyebrow className="text-ink-soft">{blogPage.tocLabel}</Eyebrow>
                <ol className="mt-5 space-y-3 border-l border-line pl-6">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-[0.975rem] leading-snug font-bold text-ink-soft transition-colors duration-300 hover:text-lokambe-blue"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <div className={toc.length > 0 ? 'lg:col-span-8' : 'lg:col-span-9'}>
            {article.isExample && (
              <p className="max-w-[68ch] border-l-2 border-lokambe-red pl-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                {BLOG_EXAMPLE_NOTICE}
              </p>
            )}

            <div
              className={article.isExample ? 'article-rich mt-12 max-w-[68ch]' : 'article-rich max-w-[68ch]'}
              dangerouslySetInnerHTML={{__html: html}}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
