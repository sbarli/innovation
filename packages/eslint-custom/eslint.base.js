import eslint from "@eslint/js"; // eslint.configs.recommended is basically "eslint:recommended"
import globals from "globals";
import { resolve } from "node:path";
import eslintConfigPrettier from "eslint-config-prettier";
import flatCompat from "./compat.js";
import tseslint from "typescript-eslint";

const tsConfig = /** @type {import("eslint").Linter.Config[]} */ (
  tseslint.configs.strict
);

/** @type {import("eslint").Linter.Config[]} */
export default [
  eslint.configs.recommended,
  ...tsConfig,
  eslintConfigPrettier,
  ...flatCompat.plugins(["eslint-config-turbo", "eslint-plugin-only-warn"]),
  {
    languageOptions: {
      parserOptions: {
        project: resolve(process.cwd(), "tsconfig.json")
      },
      globals: {
        ...globals.node,
        React: true,
        JSX: true
      }
    }
  },
  {
    rules: {
      // "import/order": ["error", {
      //     groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      //     "newlines-between": "always",

      //     alphabetize: {
      //         order: "asc",
      //         caseInsensitive: false,
      //     },

      //     pathGroups: [{
      //         pattern: "react",
      //         position: "before",
      //         group: "external",
      //     }, {
      //         pattern: "{src}/**",
      //         group: "internal",
      //     }, {
      //         pattern: "@inno/**",
      //         position: "before",
      //         group: "internal",
      //     }],

      //     pathGroupsExcludedImportTypes: [],
      // }],

      // "import/no-default-export": "error",

      "comma-dangle": ["error", {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "never",
      }],

      "prettier/prettier": [2, {
          arrowParens: "always",
          semi: true,
          singleQuote: true,
          trailingComma: "es5",
          printWidth: 100,
      }, {
          usePrettierrc: false,
      }],
    },
  },
  {
    ignores: [
      // Ignore dotfiles
      ".*.?(c)js",
      "*.config*.?(c)js",
      ".*.ts",
      "*.config*.ts",
      "*.d.ts",
      "dist",
      ".git",
      "node_modules",
      "build",
      ".next",
      "*rollup*",
      "**/.prettierrc",
      "**/*.generated.*",
    ]
  }
];