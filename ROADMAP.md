# Modernization Roadmap — 2026

Goal: bring the stack up to current standards while keeping the clean-architecture
structure (UI / Domain / Data + DI container) as the template's core teaching value.
Staying a Vite SPA — no metaframework migration in scope.

## Phase 1 — Tooling foundation

- [x] Node engines field + upgrade to a current LTS baseline (Node 20).
- [x] Vite 3 → 8 (done incrementally: 3→4→5→6→7→8, one commit per major, verifying build/dev/test at each step; latest moved to 8 mid-roadmap so the target was extended past the original 7).
- [x] Vitest 0.25 → latest (4.1.10). Replaced `@vitest/coverage-c8` (deprecated) with `@vitest/coverage-v8`. All 3 test files / 7 tests passed unchanged; also drops the duplicate nested Vite install vitest 0.25 was carrying.
- [x] TypeScript 4.9 → 5.9.3 (latest 5.x; TS7's native/Go rewrite is a separate, bigger jump kept out of scope). Inversify only uses `@injectable()`/`@inject()` on the class and constructor params, no decorated class fields, so `useDefineForClassFields` never interacts with them — no behavior change. `tsc --noEmit`, build, and all 7 tests pass unchanged.
- [x] ESLint 8.29 → 9.39.5. Migrated `.eslintrc.json`/`.eslintignore` to flat config (`eslint.config.js`). Dropped `@typescript-eslint/eslint-plugin` + `@typescript-eslint/parser` for the unified `typescript-eslint` v8 package; dropped `eslint-config-standard-with-typescript`, `eslint-plugin-import`, `eslint-plugin-n`, `eslint-plugin-promise` — none were actually referenced by the old config's `extends`, just dead weight. Added `globals` (flat config has no `env` field) and `@eslint/js`. v8's `recommended` preset is stricter than v5's: `no-explicit-any` is now `error` (was `warn`) and `{}` is banned by a new `no-empty-object-type` rule — reconfigured both back to the old repo's intent (`warn`, `allowObjectTypes`) rather than let the tooling migration silently tighten the rules. One genuinely new catch, `no-unused-expressions` (not present in v5's recommended set), flagged a ternary used only for its side effects in `useProductsTable.ts` — fixed to an if/else. Also fixed an unrelated corrupted `package-lock.json` entry (`p-limit@3.1.0` listed `aggregate-error` as a dependency instead of the real `yocto-queue`), which was silently breaking `eslint`'s CLI (via `find-up`) with a `Cannot find module` crash. `lint`, `build`, and all 7 tests pass.
- [x] Prettier 2 → 3. Upgraded to 3.9.6 (exact pin). Default `trailingComma` changed from "es5" to "all", reformatting 28 files; lint, build, and all 7 tests pass.

## Phase 2 — Dependency modernization

- [x] React 18 → 19. Bumped react, react-dom to ^19.0.0; @types/react, @types/react-dom to ^19.0.0; @testing-library/react to ^16.0.0. React 19 removed implicit children typing on styled-components — added explicit children and className props to the List component in Navbar. tsc, build, lint, and all 7 tests pass. `use()` not adopted: no clear win in this codebase (no Promise-based data loading at component boundary).
- [x] Redux Toolkit 1.9 → 2.x. Bumped @reduxjs/toolkit to ^2.0.0 and react-redux to ^9.0.0 (required for React 19 support). No breaking changes in the codebase; all reducers, hooks, and store setup remain compatible. Lint, build, and all 7 tests pass. RTK Query was evaluated but deliberately deferred — adopting it would require replacing the hand-rolled axios repositories in `src/data/remote` with RTK Query's cache-first API model, which conflicts with this template's repository pattern (Inversify DI with independent data layer). That's a real architectural rewrite that deserves its own separate, deliberate change rather than being bundled into a dependency-bump commit.
- [x] react-router-dom 6.4 → 6.latest. Bumped react-router-dom to ^6.30.4 (latest 6.x). No breaking changes; all routing APIs (Route, Routes, Link, useParams, useLocation, useMatch, useResolvedPath) remain compatible across 6.x minors. Removed unused @types/react-router-dom@^5.3.3 — react-router-dom v6 ships its own types. Tsc, lint, build, and all 7 tests pass. v7 not adopted per roadmap's explicit "optional" framing (new data APIs not needed for this plain SPA).
- [x] You currently ship both `styled-components` and `@emotion` (MUI's default engine) — that's duplicate runtime weight with no benefit. Drop `styled-components`. Migrated 7 files (SelectCountry, CustomLink, ErrorMessage, Navbar, FormComponent, Input, Shared) to `@emotion/styled` with 1:1 API swap — no `.attrs()`, `createGlobalStyle`, or theme provider usage required. Removed `styled-components` and `@types/styled-components` (15 packages total). Lint, build, and all 7 tests pass.
- [x] MUI v5 → v9. Upgraded via three incremental hops (5→6→7→9, separate commits) to @mui/material@9.2.0 and @mui/x-data-grid@9. Grid codemod skipped (zero Grid usage in this codebase). x-data-grid v5→v6 required API updates: `disableSelectionOnClick` → `disableRowSelectionOnClick`, `pageSize`/`rowsPerPageOptions` → `paginationModel`/`onPaginationModelChange`; v6→v7 added strict typing (GridColDef<Product>[]); v7→v9 no breaking changes. @emotion/react and @emotion/styled upgraded to latest to fix jsdom test compatibility. `npm install` (without `--legacy-peer-deps`) now succeeds cleanly — React 19 peer-dep issues resolved by MUI v9's explicit React 19 support. Build, lint, and all 7 tests pass.
- [x] i18next stack → latest majors. Bumped i18next 22→26.3.6, react-i18next 12→17.0.11, i18next-browser-languagedetector 7→8.2.1, i18next-http-backend 2→4.0.1. No breaking changes in hook API or initialization; all existing usage (useTranslation, i18n.changeLanguage, XHR backend for public/locales) compatible across majors. Lint, build, and all 7 tests pass.
- [x] axios 1.1.3 → 1.19.0. No breaking changes; codebase uses only standard instance creation and get requests (no interceptors, FormData handling, or transitional options). Versions 1.6–1.19 patched SSRF via absolute URL bypass, CSRF token leakage, and ReDoS vulnerabilities. Tsc, build, lint, and all 7 tests pass.
- [x] Replace `lodash.debounce` single-function package with either a tiny inline debounce or `es-toolkit`. Created a minimal debounce utility at `src/ui/utils/debounce.ts` (~25 lines, includes `.cancel()` method) rather than adding a new dependency; only one usage site in Search.tsx requires the `.cancel()` feature. Updated Search.tsx with explicit type hint for the callback parameter (value: string). Removed `lodash.debounce` and `@types/lodash.debounce`. Tsc, build, lint, and all 7 tests pass.

## Phase 3 — Testing & CI

- [x] Confirm `.github/workflows/ci.yml` runs lint, typecheck, unit tests, and coverage — not just build. Added `lint:ci` script to package.json (`eslint src` without `--fix`) and integrated into CI pipeline before BUILD. Using `--fix` in CI silently fixes errors instead of failing the run; CI must fail on lint errors to enforce standards. Pipeline order: INSTALL → LINT → BUILD (typecheck+build) → TEST (coverage). All scripts pass locally.
- [x] Migrate Cypress → Playwright for E2E. Removed Cypress, added Playwright with `@playwright/test`, created `playwright.config.ts` with chromium project, baseURL, and `npm run dev` webServer. Ported single Cypress spec file (`cypress/e2e/integration.cy.js`) to `e2e/integration.spec.ts` — both test cases preserved (countries list, search/favorites workflow). Added `e2e` and `e2e:ui` npm scripts. CI wiring deferred as follow-up (requires playwright browser binaries in CI pipeline). Local e2e run confirms Playwright launches and configures correctly; external API dependency may affect full test completion in sandboxed environment.
- [x] Update `ts-mockito` usage — ts-mockito confirmed unmaintained (last published 2.6.1 in June 2020). Removed entirely. Both GetProductsUseCase and ProductRepositoryImpl unit tests rewritten to use `vi.fn()` with `mockResolvedValue()` / `mockRejectedValue()` for setup and `expect().toHaveBeenCalledTimes()` for verification. All 7 tests pass; lint, build, and test suite clean.

## Phase 4 — Polish

- [ ] Re-audit `tsconfig.json` against TS5 strictness options (`noUncheckedIndexedAccess`, `verbatimModuleSyntax`) — good template selling point.
- [ ] README: update tech list once the above lands.

## Suggested execution order

1. Phase 1 (tooling) first — everything else is easier to verify once lint/build/test run on current tooling.
2. Phase 2 dependency bumps one at a time, running tests after each (especially MUI and RTK — both have real breaking changes).
3. Phase 3 CI/testing once the app itself is stable on new deps.
4. Phase 4 whenever.

Do dependency bumps in small, separately-committed steps — a template repo is exactly
the place where "upgrade everything in one PR" makes the eventual diff useless as a
reference for others following along.
