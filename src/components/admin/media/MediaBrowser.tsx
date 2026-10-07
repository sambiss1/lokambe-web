'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import type {ApiMedia, MediaFilters} from '@/lib/api/content-types';
import {formatMediaSize} from '@/lib/media/url';
import type {Page} from '@/lib/api/admin-types';
import {totalPages} from '@/lib/admin-format';
import {cx} from '@/lib/cx';
import type {MediaKind} from '@/lib/constants';
import {MediaThumb} from '../form/MediaPreview';
import {Pagination} from '../Pagination';
import {Surface} from '../Surface';
import {adminControl} from '../form/AdminField';

/**
 * La bibliothèque : une grille de vignettes, filtrable par genre et par
 * recherche.
 *
 * **Chaque case montre le média**, pas son nom de fichier : une photo en
 * vignette, une vidéo par son image d'attente avec sa durée. On reconnaît ce
 * qu'on cherche sans ouvrir chaque fiche.
 *
 * Les filtres vivent dans l'adresse : un lien vers « vidéos, page 2 » se
 * partage et survit à un rechargement.
 */

const KINDS: {value?: MediaKind; label: string}[] = [
  {value: undefined, label: 'Tout'},
  {value: 'image', label: 'Photos'},
  {value: 'video', label: 'Vidéos'},
];

/** Le temps laissé à la frappe avant de relancer la recherche. */
const SEARCH_DELAY_MS = 350;

export function MediaBrowser({
  result,
  filters,
  pageSize,
}: {
  result: Page<ApiMedia>;
  filters: MediaFilters;
  pageSize: number;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(filters.q ?? '');

  function go(next: MediaFilters): void {
    const params = new URLSearchParams();
    if (next.kind) params.set('kind', next.kind);
    if (next.q) params.set('q', next.q);
    if (next.page && next.page > 1) params.set('page', String(next.page));
    const query = params.toString();
    router.push(query === '' ? '/admin/medias' : `/admin/medias?${query}`);
  }

  /**
   * La recherche part après une pause de frappe. Le délai lit `search` au
   * moment où il se déclenche, et les autres filtres sont relus depuis `filters`
   * à ce moment-là : sans cela, une recherche programmée avant un changement de
   * genre réappliquerait l'ancien genre par-dessus le nouveau.
   */
  useEffect(() => {
    const current = filters.q ?? '';
    if (search === current) return;
    const timer = setTimeout(() => {
      go({kind: filters.kind, q: search.trim() === '' ? undefined : search.trim(), page: 1});
    }, SEARCH_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `go` et `router` sont stables au sein d'un rendu
  }, [search, filters.q, filters.kind]);

  const pages = totalPages(result.total, pageSize);

  return (
    <div className="mt-8 grid gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Filtrer par genre" className="flex flex-wrap gap-2">
          {KINDS.map((kind) => {
            const active = kind.value === filters.kind;
            return (
              <button
                key={kind.label}
                type="button"
                aria-pressed={active}
                onClick={() => go({kind: kind.value, q: filters.q, page: 1})}
                className={cx(
                  'rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors duration-200',
                  active
                    ? 'border-lokambe-blue bg-lokambe-blue text-white'
                    : 'border-line text-ink-soft hover:border-lokambe-blue hover:text-lokambe-blue',
                )}
              >
                {kind.label}
              </button>
            );
          })}
        </div>

        <label className="ml-auto flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-ink-soft uppercase">
          <span className="sr-only sm:not-sr-only">Rechercher</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Titre, description, nom du fichier"
            className={cx(adminControl, 'w-64 font-normal tracking-normal normal-case')}
          />
        </label>
      </div>

      {result.items.length === 0 ? (
        <Surface>
          <p className="px-5 py-10 text-center text-sm text-ink-soft">
            {filters.q || filters.kind
              ? 'Aucun média ne correspond à cette recherche.'
              : 'La médiathèque est vide. Téléversez une première photo ou vidéo.'}
          </p>
        </Surface>
      ) : (
        <Surface className="p-4 sm:p-5">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {result.items.map((media) => (
              <li key={media.id}>
                <Link
                  href={`/admin/medias/${media.id}`}
                  className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-lokambe-blue"
                >
                  <MediaThumb media={media} />
                  <p className="mt-1.5 truncate text-sm font-bold text-ink transition-colors group-hover:text-lokambe-blue">
                    {media.title ?? media.originalName}
                  </p>
                  <p className="truncate text-xs text-ink-soft">
                    {media.kind === 'video' ? 'Vidéo' : 'Photo'} · {formatMediaSize(media.size)}
                    {media.alt ? '' : ' · sans texte alternatif'}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <Pagination
              page={result.page}
              pages={pages}
              total={result.total}
              noun="média"
              onPageChange={(page) => go({...filters, page})}
            />
          </div>
        </Surface>
      )}
    </div>
  );
}
