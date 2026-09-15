import '@testing-library/jest-dom/vitest';
import {createElement} from 'react';
import {vi} from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/fr'),
  useRouter: vi.fn(() => ({push: vi.fn(), replace: vi.fn(), refresh: vi.fn(), prefetch: vi.fn(), back: vi.fn()})),
  useParams: vi.fn(() => ({locale: 'fr'})),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  redirect: vi.fn(),
  permanentRedirect: vi.fn(),
  notFound: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const {fill: _fill, priority: _priority, sizes: _sizes, ...rest} = props;
    return createElement('img', rest);
  },
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
  getTranslations: vi.fn(),
}));
