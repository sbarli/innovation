/* eslint-disable import/no-default-export */
import path from 'path';

import eslint from '@eslint/js'; // eslint.configs.recommended is basically "eslint:recommended"
import importPlugin from 'eslint-plugin-import';
import onlyWarn from 'eslint-plugin-only-warn';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import turboPlugin from 'eslint-plugin-turbo';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import flatCompat from './compat.mjs';

const tsConfig = /** @type {import("eslint").Linter.Config[]} */ (tseslint.configs.strict);

/** @type {import("eslint").Linter.Config[]} */
export default [
  eslint.configs.recommended,
  ...tsConfig,
  ...flatCompat.plugins(),
  eslintPluginPrettierRecommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    plugins: {
      turbo: turboPlugin,
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: path.resolve(process.cwd(), 'tsconfig.json'),
      },
      globals: {
        ...globals.node,
        React: true,
        JSX: true,
        jest: true,
      },
    },
  },
  {
    rules: {
      // FIXME: this is off due to a bug with ESLint v9 + import plugin + React Native/Expo
      // tl;dr - RN has to update their flow/js exports properly. for now this needs to be
      //         off for other import rules to work without errors
      'import/namespace': 'off',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },

          pathGroups: [
            {
              pattern: 'react',
              position: 'before',
              group: 'external',
            },
            {
              pattern: '{src}/**',
              group: 'internal',
            },
            {
              pattern: '@inno/**',
              position: 'before',
              group: 'internal',
            },
          ],

          pathGroupsExcludedImportTypes: [],
        },
      ],

      'import/no-default-export': 'error',

      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],

      'prettier/prettier': [
        2,
        {
          arrowParens: 'always',
          semi: true,
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 100,
        },
        {
          usePrettierrc: false,
        },
      ],
    },
  },
  {
    ignores: [
      // Ignore dotfiles
      '.*.?(c)js',
      '*.config*.?(c)js',
      '.*.?(m)js',
      '*.config*.?(m)js',
      '.*.ts',
      '*.config*.ts',
      '*.d.ts',
      '**/dist/*',
      '.git',
      '**/node_modules/*',
      '**/build/*',
      '.next',
      '*rollup*',
      '**/.prettierrc',
      '**/*.generated.*',
      '**/.yarn',
      '*.yarn',
    ],
  },
];
