import { defineConfig, Options } from 'tsup';

// eslint-disable-next-line import/no-default-export
export default defineConfig((options: Options) => ({
  entry: {
    index: 'src/index.tsx',
  },
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react'],
  dts: true,
  ...options,
}));
