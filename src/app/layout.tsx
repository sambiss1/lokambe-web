import type {ReactNode} from 'react';

// Layout racine volontairement vide : `[locale]/layout.tsx` (site public)
// et `admin/layout.tsx` (Plan 3) rendent chacun leur propre <html>.
export default function RootLayout({children}: {children: ReactNode}) {
  return children;
}
