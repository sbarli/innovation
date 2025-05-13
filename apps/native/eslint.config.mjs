import baseConfig from '@inno/eslint-custom/eslint.base.mjs';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig, 
  {
    ignores: ['src/app-core/components/gluestack/**',]
  }
];
