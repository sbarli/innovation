module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', 'turbo', 'prettier', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'eslint-config-turbo',
  ],
  env: {
    es6: true,
  },
  ignorePatterns: [
    '.prettierrc',
    '.eslintrc.js',
    'jest.config.ts',
    'node_modules',
    'node_modules/**',
    '**/node_modules',
    '**/*.generated.*',
    '**/*.d.ts',
    'dist',
    'dist/',
    'dist/**',
    '**/dist',
  ],
  rules: {
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
};
