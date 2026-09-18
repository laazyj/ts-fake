import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["tests/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "./tsconfig.tests.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["examples/**/*.ts", "test-d/**/*.ts"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // Consumer-style fixtures that resolve the package by name against the
    // built `dist`. The `.ts` ones are checked by the compatibility tsc run
    // (tsconfig.compat.json) and the `.mjs` ones are executed by the smoke
    // harness -- neither belongs in ESLint's type-aware project.
    files: ["compat/**/*.{ts,mts,cts,mjs}"],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      globals: { console: "readonly", process: "readonly" },
      parserOptions: {
        projectService: false,
        project: false,
      },
    },
  },
  {
    ignores: ["dist", "node_modules", "coverage", "*.config.*"],
  },
];
