'use client';

import {type CSSProperties, type ElementType, type ReactNode, useEffect, useRef, useState} from 'react';
import {cx} from '@/lib/cx';

type RevealProps = {
  children: ReactNode;
  id?: string;
  as?: ElementType;
  className?: string;
  /** Rang dans une série, pour décaler l'apparition. */
  index?: number;
};

/** Fait apparaître son contenu quand il entre dans l'écran (une seule fois). */
export function Reveal({children, as: Tag = 'div', className, index = 0, id}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      {rootMargin: '0px 0px -12% 0px'},
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} data-shown={shown} style={{'--i': index} as CSSProperties} className={cx('reveal', className)}>
      {children}
    </Tag>
  );
}
