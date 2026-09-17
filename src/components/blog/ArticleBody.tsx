import Image from 'next/image';
import {BLOG_EXAMPLE_NOTICE, type BlogArticle, type BlogBlock, blogPage, headingAnchor} from '@/content/blog';
import {Reveal} from '../motion/Reveal';
import {Container} from '../ui/Container';
import {Eyebrow} from '../ui/Eyebrow';

function Paragraph({text}: {text: string}) {
  return <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft first:mt-0 sm:text-lg">{text}</p>;
}

function Heading({text, id}: {text: string; id: string}) {
  return (
    <h2 id={id} className="display mt-14 flex gap-3.5 text-[clamp(1.25rem,3.2vw,1.8rem)] text-lokambe-blue first:mt-0">
      <span aria-hidden="true" className="mt-[0.42em] h-2 w-5 flex-none rounded-full bg-lokambe-red" />
      <span>{text}</span>
    </h2>
  );
}

function Quote({text, attribution}: {text: string; attribution?: string}) {
  return (
    <figure className="mt-12 rounded-[1.75rem] bg-lokambe-peach-soft p-7 first:mt-0 sm:p-9">
      <span aria-hidden="true" className="block h-2.5 w-7 rounded-full bg-lokambe-red" />
      <blockquote className="mt-5 text-xl leading-snug font-extrabold text-lokambe-blue sm:text-[1.6rem]">
        {text}
      </blockquote>
      {attribution && <figcaption className="mt-4 text-sm font-medium text-ink-soft">{attribution}</figcaption>}
    </figure>
  );
}

function BlockList({title, items, ordered}: {title?: string; items: string[]; ordered?: boolean}) {
  const List = ordered ? 'ol' : 'ul';
  return (
    <div className="mt-10 rounded-[1.75rem] ring-1 ring-line ring-inset first:mt-0">
      {title && (
        <p className="border-b border-line px-6 py-4 text-[0.8125rem] font-bold tracking-[0.1em] text-lokambe-blue uppercase sm:px-7">
          {title}
        </p>
      )}
      <List className="divide-y divide-line">
        {items.map((item, index) => (
          <li key={item.slice(0, 40)} className="flex gap-4 px-6 py-4 sm:px-7">
            {ordered ? (
              <span aria-hidden="true" className="w-5 flex-none text-base font-extrabold text-lokambe-red tabular-nums">
                {index + 1}
              </span>
            ) : (
              <span aria-hidden="true" className="mt-2.5 h-2 w-4 flex-none rounded-full bg-lokambe-red" />
            )}
            <span className="text-base leading-relaxed text-ink-soft sm:text-[1.0625rem]">{item}</span>
          </li>
        ))}
      </List>
    </div>
  );
}

function Block({block, anchor}: {block: BlogBlock; anchor: string}) {
  switch (block.kind) {
    case 'heading':
      return <Heading text={block.text} id={anchor} />;
    case 'quote':
      return <Quote text={block.text} attribution={block.attribution} />;
    case 'list':
      return <BlockList title={block.title} items={block.items} ordered={block.ordered} />;
    default:
      return <Paragraph text={block.text} />;
  }
}

/** Corps d’un article : couverture, sommaire ancré et blocs de texte. */
export function ArticleBody({article}: {article: BlogArticle}) {
  const anchors = article.body.map((block, index) => (block.kind === 'heading' ? headingAnchor(block.text, index) : ''));
  const toc = article.body.flatMap((block, index) =>
    block.kind === 'heading' ? [{id: anchors[index], text: block.text}] : [],
  );

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
            <p className="max-w-[68ch] border-l-2 border-lokambe-red pl-5 text-[0.9375rem] leading-relaxed text-ink-soft">
              {BLOG_EXAMPLE_NOTICE}
            </p>

            <div className="mt-12 max-w-[68ch]">
              {article.body.map((block, index) => (
                <Block key={`${block.kind}-${index}`} block={block} anchor={anchors[index]} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
