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

export const APPLY_HREF: PublicPath = '/soumettre-un-projet';
