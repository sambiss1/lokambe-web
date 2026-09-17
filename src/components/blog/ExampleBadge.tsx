import {BLOG_EXAMPLE_LABEL} from '@/content/blog';
import {cx} from '@/lib/cx';

/** Mention discrète : les articles du blog sont des exemples éditoriaux. */
export function ExampleBadge({tone = 'light', className}: {tone?: 'light' | 'dark'; className?: string}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.6875rem] font-bold tracking-[0.14em] uppercase',
        tone === 'dark'
          ? 'bg-white/10 text-white/80 ring-1 ring-white/25 ring-inset'
          : 'bg-lokambe-peach-soft text-ink-soft ring-1 ring-line ring-inset',
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 flex-none rounded-full bg-lokambe-red" />
      {BLOG_EXAMPLE_LABEL}
    </span>
  );
}
