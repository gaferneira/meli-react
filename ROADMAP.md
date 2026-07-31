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
- [ ] Prettier 2 → 3.

## Phase 2 — Dependency modernization

- [ ] React 18 → 19. Check for removed APIs (`propTypes` on function components is already gone from your config, good) and adopt `use()` where it simplifies data loading if relevant.
- [ ] Redux Toolkit 1.9 → 2.x. Evaluate RTK Query to replace hand-rolled axios repositories in `src/data/remote` — this is the one place where a real API change (not just a bump) pays off for a template meant to show "current best practice."
- [ ] react-router-dom 6.4 → 6.latest (or 7, if you want to demonstrate the new data APIs — optional, not required for an SPA).
- [ ] You currently ship both `styled-components` and `@emotion` (MUI's default engine) — that's duplicate runtime weight with no benefit. Drop `styled-components`.
- [ ] MUI v5 → v6/v7. Note codemods exist for the v5→v6 Grid API changes.
- [ ] i18next stack → latest majors (i18next, react-i18next, browser-languagedetector, http-backend).
- [ ] axios → latest (check for the CVEs patched since 1.1.3).
- [ ] Replace `lodash.debounce` single-function package with either a tiny inline debounce or `es-toolkit` (lighter, tree-shakeable alternative gaining adoption over lodash in 2026).

## Phase 3 — Testing & CI

- [ ] Confirm `.github/workflows/ci.yml` runs lint, typecheck, unit tests, and coverage — not just build.
- [ ] Consider Cypress → Playwright for E2E. Not mandatory (Cypress is still maintained), but Playwright is the more common default for new React templates now and has better CI ergonomics (parallelization, trace viewer).
- [ ] Update `ts-mockito` usage — check it's still maintained; `vitest`'s built-in `vi.fn()`/`vi.mock` may cover the same needs without an extra dependency.

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
