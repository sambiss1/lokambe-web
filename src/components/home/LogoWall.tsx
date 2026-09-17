'use client';

import {X} from 'lucide-react';
import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import type {LogoEntry, LogoWallContent} from '@/content/types';
import {cx} from '@/lib/cx';
import {Container} from '../ui/Container';
import {Eyebrow} from '../ui/Eyebrow';

/**
 * Bandeau de logos qui défile (portefeuille ou partenaires). Un clic ouvre la
 * fiche de l'entreprise. Tant qu'un logo n'est pas fourni, la tuile affiche le
 * monogramme et reste à la bonne taille : déposer l'image suffira.
 */
export function LogoWall({content, tone = 'light'}: {content: LogoWallContent; tone?: 'light' | 'peach'}) {
  const [selected, setSelected] = useState<LogoEntry | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  const tiles = content.items;

  return (
    <section className={cx('overflow-hidden py-20 sm:py-28', tone === 'peach' ? 'bg-lokambe-peach-soft' : 'bg-white')}>
      <Container>
        <Eyebrow className="text-ink-soft">{content.eyebrow}</Eyebrow>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h2 className="display text-[clamp(1.95rem,4.26vw,3.9rem)] text-lokambe-blue">{content.title}</h2>
          {content.intro && <p className="text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">{content.intro}</p>}
        </div>
      </Container>

      {tiles.length === 0 ? (
        <Container className="mt-12">
          <p className="rounded-[1.75rem] bg-white p-8 text-center text-lg text-ink-soft ring-1 ring-line ring-inset">
            {content.empty}
          </p>
        </Container>
      ) : (
        <div className="logo-rail no-scrollbar mt-12 flex overflow-hidden px-5 sm:px-8" aria-label={content.title} role="group">
          <div className="logo-track motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <div key={copy} className="logo-copy flex" aria-hidden={copy === 1 ? true : undefined}>
                {tiles.map((item) => (
                  <button
                    key={`${copy}-${item.id}`}
                    type="button"
                    tabIndex={copy === 1 ? -1 : undefined}
                    onClick={() => setSelected(item)}
                    className={cx(
                      'mx-2 flex h-28 w-52 flex-none scroll-ml-5 snap-start items-center justify-center gap-3 rounded-[1.5rem] px-6',
                      'ring-1 ring-line ring-inset transition-[transform,box-shadow,background-color] duration-300',
                      'hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(0,18,168,0.5)] focus-visible:-translate-y-1',
                      tone === 'peach' ? 'bg-white' : 'bg-lokambe-peach-soft',
                    )}
                  >
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={180}
                        height={90}
                        className="h-14 w-auto object-contain"
                      />
                    ) : (
                      <>
                        <span className="grid size-11 flex-none place-items-center rounded-full bg-lokambe-blue text-lg font-extrabold text-white">
                          {item.name.slice(0, 1)}
                        </span>
                        <span className="text-left">
                          <span className="block text-base font-extrabold text-ink">{item.name}</span>
                          <span className="block text-sm text-ink-soft">Logo à venir</span>
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setSelected(null);
        }}
        className={cx(
          'm-auto w-[min(32rem,calc(100vw-2rem))] rounded-[2rem] p-0 backdrop:bg-ink/60 backdrop:backdrop-blur-sm',
          'open:animate-[lk-fade-up_0.35s_var(--ease-out-expo)_both]',
        )}
      >
        {selected && (
          <div className="p-7 sm:p-9">
            <div className="flex items-start justify-between gap-6">
              <span className="grid size-14 flex-none place-items-center rounded-full bg-lokambe-blue text-xl font-extrabold text-white">
                {selected.name.slice(0, 1)}
              </span>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label={content.detail.close}
                className="grid size-10 place-items-center rounded-full bg-lokambe-peach-soft text-ink transition-colors hover:bg-lokambe-red hover:text-white"
              >
                <X aria-hidden="true" className="size-5" strokeWidth={2.5} />
              </button>
            </div>

            <h3 className="display mt-5 text-2xl text-lokambe-blue">{selected.name}</h3>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{selected.text ?? content.empty}</p>

            <dl className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-ink-soft">{content.detail.sectorLabel}</dt>
                <dd className={cx('mt-1 text-lg font-bold', selected.sector ? 'text-ink' : 'text-ink-soft/60')}>
                  {selected.sector ?? content.detail.pending}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-ink-soft">{content.detail.statusLabel}</dt>
                <dd className={cx('mt-1 text-lg font-bold', selected.status ? 'text-ink' : 'text-ink-soft/60')}>
                  {selected.status ?? content.detail.pending}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </dialog>
    </section>
  );
}
