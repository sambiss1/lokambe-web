import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    env: {
      NEXT_PUBLIC_ENABLED_LOCALES: 'fr,en',
      NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    },
    server: {deps: {inline: ['next-intl']}},
  },
});
