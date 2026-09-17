import type {PublicPath} from '@/lib/site-paths';

export type NavKey = 'about' | 'model' | 'team' | 'process' | 'sectors' | 'impact' | 'blog' | 'careers' | 'contact';

export const NAV_ITEMS: readonly {key: NavKey; href: PublicPath}[] = [
  {key: 'about', href: '/a-propos'},
  {key: 'model', href: '/notre-modele'},
  {key: 'process', href: '/processus'},
  {key: 'sectors', href: '/secteurs-et-criteres'},
  {key: 'team', href: '/notre-equipe'},
  {key: 'impact', href: '/impact'},
  {key: 'blog', href: '/blog'},
  {key: 'careers', href: '/carrieres'},
  {key: 'contact', href: '/contact'},
];

export type NavLeaf = {key: NavKey; href: PublicPath};
export type NavGroupKey = 'fund' | 'invest';
export type NavEntry = {kind: 'group'; key: NavGroupKey; items: readonly NavLeaf[]} | ({kind: 'link'} & NavLeaf);

/** Structure du menu principal (menus déroulants façon blast.club). */
export const MAIN_NAV: readonly NavEntry[] = [
  {
    kind: 'group',
    key: 'fund',
    items: [
      {key: 'about', href: '/a-propos'},
      {key: 'model', href: '/notre-modele'},
      {key: 'team', href: '/notre-equipe'},
    ],
  },
  {
    kind: 'group',
    key: 'invest',
    items: [
      {key: 'process', href: '/processus'},
      {key: 'sectors', href: '/secteurs-et-criteres'},
    ],
  },
  {kind: 'link', key: 'impact', href: '/impact'},
  {kind: 'link', key: 'blog', href: '/blog'},
  {kind: 'link', key: 'contact', href: '/contact'},
];

export const APPLY_HREF: PublicPath = '/soumettre-un-projet';
