import { defineConfig } from 'vitest/config';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import swc from 'unplugin-swc';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/auction-api',
  plugins: [
    // resolves @auction-workspace/* aliases inside specs (e.g. shared/domain)
    nxViteTsPaths(),
    // SWC transpiles TS instead of Vite's esbuild. esbuild supports
    // `experimentalDecorators` but DOES NOT emit decorator metadata, which
    // Nest's DI reads at runtime via reflect-metadata. Without this, building a
    // TestingModule throws "Nest can't resolve dependencies". SWC with
    // decoratorMetadata:true restores the `design:paramtypes` metadata.
    swc.vite({
      module: { type: 'es6' },
      jsc: {
        target: 'es2021',
        parser: { syntax: 'typescript', decorators: true },
        transform: { legacyDecorator: true, decoratorMetadata: true },
        keepClassNames: true,
      },
    }),
  ],
  test: {
    name: 'auction-api',
    watch: false,
    globals: true,
    environment: 'node',
    setupFiles: ['reflect-metadata'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/auction-api',
      provider: 'v8' as const,
    },
  },
}));
