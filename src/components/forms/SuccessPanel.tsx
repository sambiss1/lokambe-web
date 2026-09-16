import {Check} from 'lucide-react';
import type {ReactNode} from 'react';

/** Écran de confirmation après envoi d'un formulaire. */
export function SuccessPanel({
  title,
  text,
  notice,
  children,
}: {
  title: string;
  text: string;
  notice?: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-[2rem] bg-white p-7 ring-1 ring-line ring-inset sm:p-10">
      <span className="grid size-14 place-items-center rounded-full bg-lokambe-blue text-white">
        <Check aria-hidden="true" className="size-7" strokeWidth={3} />
      </span>
      <h2 className="display mt-6 text-[clamp(1.55rem,3.28vw,2.45rem)] text-lokambe-blue">{title}</h2>
      <p className="mt-4 max-w-[55ch] text-lg leading-relaxed text-ink-soft">{text}</p>
      <div className="mt-8">{children}</div>
      {notice && <p className="mt-8 rounded-2xl bg-lokambe-peach-soft px-5 py-4 text-base text-ink-soft">{notice}</p>}
    </div>
  );
}
