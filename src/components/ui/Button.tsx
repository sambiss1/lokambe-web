import type {ComponentProps, ReactNode} from 'react';
import {Link} from '@/i18n/navigation';
import {cx} from '@/lib/cx';

export type ButtonVariant = 'blue' | 'red' | 'white' | 'peach' | 'ink' | 'outline-white' | 'outline-blue';
export type ButtonSize = 'md' | 'lg';

const VARIANTS: Record<ButtonVariant, {base: string; dot: string}> = {
  blue: {base: 'bg-lokambe-blue text-white hover:bg-lokambe-blue-deep', dot: 'bg-white'},
  red: {base: 'bg-lokambe-red text-white hover:bg-[#c8062f]', dot: 'bg-white'},
  white: {base: 'bg-white text-lokambe-blue hover:bg-lokambe-peach-soft', dot: 'bg-lokambe-red'},
  peach: {base: 'bg-lokambe-peach text-lokambe-blue hover:bg-white', dot: 'bg-lokambe-blue'},
  ink: {base: 'bg-ink text-white hover:bg-lokambe-blue', dot: 'bg-lokambe-peach'},
  'outline-white': {base: 'text-white ring-2 ring-inset ring-white/45 hover:ring-white hover:bg-white/10', dot: 'bg-lokambe-peach'},
  'outline-blue': {base: 'text-lokambe-blue ring-2 ring-inset ring-lokambe-blue/30 hover:ring-lokambe-blue', dot: 'bg-lokambe-red'},
};

const SIZES: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5 text-[0.9375rem]',
  lg: 'min-h-13 px-6 text-base',
};

export function buttonClasses(variant: ButtonVariant = 'blue', size: ButtonSize = 'md', className?: string) {
  return cx(
    'group/btn relative inline-flex items-center justify-center gap-3 rounded-full font-bold whitespace-nowrap',
    'transition-[background-color,box-shadow,color,transform] duration-300 ease-(--ease-out-expo) active:scale-[0.97]',
    VARIANTS[variant].base,
    SIZES[size],
    className,
  );
}

/** Le point du logo, qui s'étire au survol. */
function Dot({variant}: {variant: ButtonVariant}) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        'h-2 w-2 flex-none rounded-full transition-[width] duration-300 ease-(--ease-out-expo) group-hover/btn:w-5',
        VARIANTS[variant].dot,
      )}
    />
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'className' | 'children'> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function ButtonLink({children, variant = 'blue', size = 'md', className, ...props}: ButtonLinkProps) {
  return (
    <Link {...props} className={buttonClasses(variant, size, className)}>
      <span>{children}</span>
      <Dot variant={variant} />
    </Link>
  );
}

type ButtonProps = ComponentProps<'button'> & {variant?: ButtonVariant; size?: ButtonSize};

export function Button({children, variant = 'blue', size = 'md', className, type = 'button', ...props}: ButtonProps) {
  return (
    <button type={type} {...props} className={buttonClasses(variant, size, cx('disabled:opacity-50', className))}>
      <span>{children}</span>
      <Dot variant={variant} />
    </button>
  );
}
