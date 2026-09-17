import Image from 'next/image';
import type {TeamRoleCard} from '@/content/team';
import {Reveal} from '../motion/Reveal';

/**
 * Cadre du portrait. Tant que `photo.ready` est faux, un bloc bleu au
 * monogramme du rôle tient la place exacte de la future photographie.
 */
function RolePortrait({role}: {role: TeamRoleCard}) {
  return (
    <div className="relative isolate aspect-square w-full overflow-hidden bg-lokambe-blue sm:aspect-[4/5]">
      {role.photo.ready ? (
        <Image
          src={role.photo.src}
          alt={role.photo.alt}
          fill
          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      ) : (
        <>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -top-14 -right-16 -z-10 h-[135%] w-auto opacity-70"
            viewBox="0 0 600 700"
            fill="none"
          >
            <path d="M560 40 A300 300 0 0 0 260 340 V700" stroke="#0014c9" strokeWidth="70" strokeLinecap="round" />
          </svg>
          <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
            <span className="display text-[clamp(2rem,4vw,2.75rem)] text-white">{role.initials}</span>
          </span>
          <span aria-hidden="true" className="absolute bottom-5 left-5 h-2.5 w-6 rounded-full bg-lokambe-red" />
        </>
      )}
    </div>
  );
}

/** Grille des rôles permanents : portrait (ou réserve) et résumé du rôle. */
export function TeamRoles({members}: {members: TeamRoleCard[]}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((role, index) => (
        <Reveal
          as="li"
          key={role.slug}
          index={index % 4}
          className="flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line ring-inset"
        >
          <RolePortrait role={role} />
          <div className="flex flex-col p-6">
            <h3 className="text-[1.0625rem] leading-tight font-extrabold text-lokambe-blue uppercase">{role.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">{role.summary}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
