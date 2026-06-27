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
    // Consumer-style fixtures used only to type-check the published package
    // against the TypeScript floor (see tsconfig.compat.json). They resolve
    // the package by name against the built `dist`, so they are checked by
    // the compatibility tsc run, not by ESLint's type-aware project.
    files: ["compat/**/*.{ts,mts,cts}"],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
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
