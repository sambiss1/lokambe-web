import type {ReactNode} from 'react';
import {Eyebrow} from '@/components/ui/Eyebrow';

type Props = {eyebrow: string; title: string; description?: string; actions?: ReactNode};

/** En-tête d'écran : surtitre à point rouge, titre en capitales, actions à droite. */
export function PageHeader({eyebrow, title, description, actions}: Props) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="min-w-0">
        <Eyebrow className="text-sm text-ink-soft">{eyebrow}</Eyebrow>
        <h1 className="display mt-2 text-[clamp(1.55rem,3.28vw,2.15rem)]">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-ink-soft">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </header>
  );
}
