import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

// eslint-plugin-react was removed: it doesn't support ESLint 10 yet
// (peerDependency capped at ^9.7, RuleContext API removed in v10).
// Re-add once https://github.com/jsx-eslint/eslint-plugin-react/pull/4022 ships.
//
// eslint-plugin-jsx-a11y's peerDependency is also capped at ESLint ^9, but
// unlike eslint-plugin-react it doesn't touch the removed RuleContext API —
// it works fine on ESLint 10 in practice. Forced via package.json
// `overrides` so `npm install` still succeeds clean. Re-check the peer range
// on future bumps.
//
// eslint-plugin-react-hooks v5+ folds in the former eslint-plugin-react-compiler
// rules (recommended-latest flag-catches violations of the Rules of React that
// would make auto-memoization unsafe/no-op) — no separate compiler ESLint
// package needed.
export default tseslint.config(
  { ignores: ["dist", "coverage", "cypress", "**/*.css"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      jsxA11y.flatConfigs.recommended,
      reactHooks.configs.flat["recommended-latest"],
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowObjectTypes: "always" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  prettier,
);
