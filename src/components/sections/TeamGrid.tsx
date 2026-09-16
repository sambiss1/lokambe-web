import type {TeamRole} from '@/content/types';
import {Reveal} from '../motion/Reveal';

/** Rôles de l'équipe : résumé et responsabilités, dépliables. */
export function TeamGrid({members}: {members: TeamRole[]}) {
  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {members.map((member, index) => (
        <Reveal as="li" key={member.title} index={index % 2} className="flex flex-col rounded-[1.75rem] bg-white p-7 ring-1 ring-line ring-inset">
          <h3 className="text-xl leading-tight font-extrabold text-lokambe-blue uppercase">{member.title}</h3>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">{member.summary}</p>
          <details className="faq-item group mt-6 border-t border-line pt-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink">
              {member.responsibilitiesTitle}
              <span className="grid size-8 flex-none place-items-center rounded-full bg-lokambe-peach-soft text-lokambe-blue transition-transform duration-500 ease-(--ease-out-expo) group-open:rotate-45">
                <span aria-hidden="true" className="relative block size-3.5">
                  <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 rounded-full bg-current" />
                  <span className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 rounded-full bg-current" />
                </span>
              </span>
            </summary>
            <ul className="space-y-2.5 pt-5">
              {member.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-snug text-ink-soft">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lokambe-red" />
                  {item}
                </li>
              ))}
            </ul>
          </details>
          {member.note && <p className="mt-5 text-base text-ink-soft italic">{member.note}</p>}
        </Reveal>
      ))}
    </ul>
  );
}
