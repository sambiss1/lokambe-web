import type {Pillar} from '@/content/types';
import {Reveal} from '../motion/Reveal';
import {ListPanel} from './ListPanel';

/** Pilier d'intervention : intitulé, texte et groupes de besoins financés. */
export function PillarBlock({pillar}: {pillar: Pillar}) {
  return (
    <article className="border-t-2 border-lokambe-blue pt-8">
      <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-lokambe-red">{pillar.label}</p>
          <h3 className="display mt-3 text-[clamp(1.9rem,3.4vw,3rem)] text-lokambe-blue">{pillar.title}</h3>
        </div>
        <p className="text-lg leading-relaxed text-ink-soft lg:col-span-7">{pillar.text}</p>
      </Reveal>
      <div className="mt-10">
        <ListPanel groups={pillar.groups} columns={3} />
      </div>
      {pillar.closing && (
        <Reveal className="mt-8">
          <p className="max-w-[60ch] border-l-4 border-lokambe-red pl-4 text-lg font-bold text-ink">{pillar.closing}</p>
        </Reveal>
      )}
    </article>
  );
}
