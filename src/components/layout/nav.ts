import type {PublicPath} from '@/lib/site-paths';

export type NavKey = 'about' | 'model' | 'process' | 'sectors' | 'governance' | 'impact' | 'investors' | 'contact';

export const NAV_ITEMS: readonly {key: NavKey; href: PublicPath}[] = [
  {key: 'about', href: '/a-propos'},
  {key: 'model', href: '/notre-modele'},
  {key: 'process', href: '/processus'},
  {key: 'sectors', href: '/secteurs-et-criteres'},
  {key: 'governance', href: '/gouvernance'},
  {key: 'impact', href: '/impact'},
  {key: 'investors', href: '/investisseurs-et-partenaires'},
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
      {key: 'governance', href: '/gouvernance'},
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
  {kind: 'link', key: 'investors', href: '/investisseurs-et-partenaires'},
  {kind: 'link', key: 'contact', href: '/contact'},
];

export const APPLY_HREF: PublicPath = '/soumettre-un-projet';
