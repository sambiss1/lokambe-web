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
  const [hovered, setHovered] = useState<HoveredTile | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  /**
   * La fiche au survol n'a de sens qu'avec un pointeur. Sur un écran tactile,
   * un appui déclencherait le survol *et* le clic : la fiche s'afficherait
   * derrière sa propre boîte de dialogue.
   */
  const showOnHover = (item: LogoEntry, element: HTMLElement) => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const box = element.getBoundingClientRect();
    const half = Math.min(FICHE_WIDTH, window.innerWidth - 2 * FICHE_MARGIN) / 2;

    // Centrée sous la tuile, mais jamais hors de l'écran : les premiers et les
    // derniers logos du bandeau touchent les bords.
    const x = clamp(box.left + box.width / 2, half + FICHE_MARGIN, window.innerWidth - half - FICHE_MARGIN);
    // Et au-dessus plutôt qu'en dessous quand le bas de la fenêtre est trop
    // proche, sinon la fiche s'ouvre dans le vide.
    const above = box.bottom + FICHE_HEIGHT + FICHE_MARGIN > window.innerHeight;

    setHovered({item, x, y: above ? box.top - 12 : box.bottom + 12, above});
  };

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
      // Le client ne veut pas que la tuile bouge au survol : la fiche qui
      // apparaît suffit à dire que le logo répond.
      interactive && 'cursor-pointer transition-[box-shadow] duration-200 hover:ring-2 hover:ring-lokambe-blue/35',
    );

  return (
    <section className={cx('overflow-hidden py-28 sm:py-36', tone === 'peach' ? 'bg-lokambe-peach-soft' : 'bg-white')}>
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
        <div
          className="logo-rail no-scrollbar mt-14 flex overflow-hidden px-5 py-4 sm:px-8"
          aria-label={content.title}
          role="group"
          onMouseLeave={() => setHovered(null)}
        >
          <div className="logo-track motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <div key={copy} className="logo-copy flex" aria-hidden={copy === 1 ? true : undefined}>
                {tiles.map((item) => (
                  <button
                    key={`${copy}-${item.id}`}
                    type="button"
                    tabIndex={copy === 1 ? -1 : undefined}
                    onClick={() => {
                      setHovered(null);
                      setSelected(item);
                    }}
                    onMouseEnter={(event) => showOnHover(item, event.currentTarget)}
                    onFocus={(event) => showOnHover(item, event.currentTarget)}
                    onBlur={() => setHovered(null)}
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

      {/* Au survol, la même fiche qu'au clic, en plus compact. `fixed` la sort
          des deux `overflow-hidden` — celui de la section et celui du bandeau —
          qui la couperaient en deux. */}
      {interactive && hovered && (
        <div
          role="tooltip"
          style={{left: hovered.x, top: hovered.y}}
          className={cx(
            'pointer-events-none fixed z-50 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 rounded-[1.5rem] bg-white p-6',
            'shadow-[0_30px_70px_-30px_rgba(0,18,168,0.55)] ring-1 ring-ink/10 ring-inset',
            hovered.above && '-translate-y-full',
          )}
        >
          <Fiche item={hovered.item} content={content} compact />
        </div>
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

              <Fiche item={selected} content={content} />
            </div>
          )}
        </dialog>
      )}
    </section>
  );
}

/** Où poser la fiche flottante : au centre de la tuile, au-dessus ou dessous. */
type HoveredTile = {item: LogoEntry; x: number; y: number; above: boolean};

/** Mesures de la fiche au survol, en pixels : largeur, marge au bord, hauteur
 *  estimée — elle dépend du texte, on ne la mesure pas, on s'en approche. */
const FICHE_WIDTH = 384;
const FICHE_MARGIN = 16;
const FICHE_HEIGHT = 260;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max));

/**
 * Le contenu d'une fiche, partagé par la boîte de dialogue du clic et la carte
 * du survol. Deux rendus de la même chose divergent toujours ; celui-ci est
 * écrit une fois.
 */
function Fiche({item, content, compact}: {item: LogoEntry; content: LogoWallContent; compact?: boolean}) {
  return (
    <>
      <h3 className={cx('display text-lokambe-blue', compact ? 'text-xl' : 'mt-5 text-2xl')}>{item.name}</h3>
      <p className={cx('leading-relaxed text-ink-soft', compact ? 'mt-2 text-[0.95rem]' : 'mt-3 text-[1.0625rem]')}>
        {item.text ?? content.empty}
      </p>

      <dl className={cx('grid gap-4 border-t border-line sm:grid-cols-2', compact ? 'mt-4 pt-4' : 'mt-6 pt-6')}>
        <div>
          <dt className="text-sm font-medium text-ink-soft">{content.detail.sectorLabel}</dt>
          <dd className={cx('mt-1 font-bold', compact ? 'text-base' : 'text-lg', item.sector ? 'text-ink' : 'text-ink-soft/60')}>
            {item.sector ?? content.detail.pending}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-ink-soft">{content.detail.statusLabel}</dt>
          <dd className={cx('mt-1 font-bold', compact ? 'text-base' : 'text-lg', item.status ? 'text-ink' : 'text-ink-soft/60')}>
            {item.status ?? content.detail.pending}
          </dd>
        </div>
      </dl>
    </>
  );
}
