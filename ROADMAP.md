# Modernization Roadmap — 2026

Goal: bring the stack up to current standards while keeping the clean-architecture
structure (UI / Domain / Data + DI container) as the template's core teaching value.
Staying a Vite SPA — no metaframework migration in scope.

## Phase 1 — Tooling foundation

- [x] Node engines field + upgrade to a current LTS baseline (Node 20).
- [x] Vite 3 → 8 (done incrementally: 3→4→5→6→7→8, one commit per major, verifying build/dev/test at each step; latest moved to 8 mid-roadmap so the target was extended past the original 7).
- [x] Vitest 0.25 → latest (4.1.10). Replaced `@vitest/coverage-c8` (deprecated) with `@vitest/coverage-v8`. All 3 test files / 7 tests passed unchanged; also drops the duplicate nested Vite install vitest 0.25 was carrying.
- [ ] TypeScript 4.9 → 5.x. Recheck `experimentalDecorators` behavior with Inversify — TS5 still supports legacy decorators but confirm `useDefineForClassFields` interaction.
- [ ] ESLint 8 → 9. Migrate `.eslintrc.json` to flat config (`eslint.config.js`). `eslint-config-standard-with-typescript` and several plugins need flat-config-compatible versions or replacement with `typescript-eslint`'s own recommended configs.
- [ ] Prettier 2 → 3.

## Phase 2 — Dependency modernization

- [ ] React 18 → 19. Check for removed APIs (`propTypes` on function components is already gone from your config, good) and adopt `use()` where it simplifies data loading if relevant.
- [ ] Redux Toolkit 1.9 → 2.x. Evaluate RTK Query to replace hand-rolled axios repositories in `src/data/remote` — this is the one place where a real API change (not just a bump) pays off for a template meant to show "current best practice."
- [ ] react-router-dom 6.4 → 6.latest (or 7, if you want to demonstrate the new data APIs — optional, not required for an SPA).
- [ ] **Pick one CSS-in-JS engine.** You currently ship both `styled-components` and `@emotion` (MUI's default engine) — that's duplicate runtime weight with no benefit. Either drop `styled-components` and lean fully on MUI's `sx`/`styled` from emotion, or drop MUI's emotion dependency and re-theme with styled-components. For a template, dropping `styled-components` is the lower-effort path since MUI already requires emotion.
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
