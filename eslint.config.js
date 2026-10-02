import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

// eslint-plugin-react was removed: it doesn't support ESLint 10 yet
// (peerDependency capped at ^9.7, RuleContext API removed in v10).
// Re-add once https://github.com/jsx-eslint/eslint-plugin-react/pull/4022 ships.
export default tseslint.config(
  { ignores: ["dist", "coverage", "cypress", "**/*.css"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
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
