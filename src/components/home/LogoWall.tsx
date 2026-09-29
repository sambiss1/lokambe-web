'use client';

import {X} from 'lucide-react';
import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';
import type {LogoEntry, LogoWallContent} from '@/content/types';
import {cx} from '@/lib/cx';
import {Container} from '../ui/Container';
import {Eyebrow} from '../ui/Eyebrow';

/**
 * Mur de logos : le portefeuille, ou les partenaires.
 *
 * Les logos fournis par le client sont des **carrés au fond coloré** — chaque
 * marque a le sien. Il a tranché le 29 septembre : on les affiche tels quels,
 * pleine tuile, sans les poser sur un aplat neutre. Tant qu'un logo manque, la
 * tuile affiche le monogramme et garde sa taille : déposer l'image suffira.
 *
 * Deux comportements, selon ce qu'on a à montrer :
 *
 * - **Le portefeuille** défile en boucle et chaque tuile ouvre une fiche :
 *   activité, secteur, avancement du projet.
 * - **Les partenaires** sont juste des logos (`interactive={false}`) : le client
 *   ne veut rien afficher de plus. Et comme ils se comptent sur une main, ils
 *   sont posés en ligne centrée plutôt que dans un bandeau défilant — une boucle
 *   d'un seul logo n'est pas une boucle, c'est un bégaiement.
 */
export function LogoWall({
  content,
  tone = 'light',
  interactive = true,
}: {
  content: LogoWallContent;
  tone?: 'light' | 'peach';
  interactive?: boolean;
}) {
  const [selected, setSelected] = useState<LogoEntry | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  const tiles = content.items;
  /** En dessous, une bande défilante laisserait un trou visible à chaque tour. */
  const scrolls = tiles.length > 3;

  const tile = (item: LogoEntry) =>
    item.logo ? (
      <Image src={item.logo} alt={item.name} width={200} height={200} className="size-full object-cover" />
    ) : (
      <span className="flex flex-col items-center gap-2 px-3">
        <span className="grid size-11 flex-none place-items-center rounded-full bg-lokambe-blue text-lg font-extrabold text-white">
          {item.name.slice(0, 1)}
        </span>
        <span className="text-center text-sm leading-tight font-extrabold text-ink">{item.name}</span>
      </span>
    );

  const tileClass = (item: LogoEntry) =>
    cx(
      'mx-2 flex size-32 flex-none scroll-ml-5 snap-start items-center justify-center gap-3 overflow-hidden rounded-[1.5rem] sm:size-36',
      'ring-1 ring-line ring-inset',
      item.logo ? 'ring-ink/10' : tone === 'peach' ? 'bg-white' : 'bg-lokambe-peach-soft',
      interactive &&
        'transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(0,18,168,0.5)] focus-visible:-translate-y-1',
    );

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
      ) : scrolls ? (
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
                    className={tileClass(item)}
                  >
                    {tile(item)}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Container className="mt-12">
          <ul className="flex flex-wrap justify-center">
            {tiles.map((item) => (
              <li key={item.id} className={tileClass(item)}>
                {tile(item)}
              </li>
            ))}
          </ul>
        </Container>
      )}

      {/* Pas de fiche à ouvrir quand les tuiles ne sont pas cliquables : inutile
          de laisser un <dialog> mort dans la page. */}
      {interactive && (
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
                {selected.logo ? (
                  <Image
                    src={selected.logo}
                    alt=""
                    width={200}
                    height={200}
                    className="size-16 flex-none rounded-2xl object-cover ring-1 ring-ink/10 ring-inset"
                  />
                ) : (
                  <span className="grid size-14 flex-none place-items-center rounded-full bg-lokambe-blue text-xl font-extrabold text-white">
                    {selected.name.slice(0, 1)}
                  </span>
                )}
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
      )}
    </section>
  );
}
