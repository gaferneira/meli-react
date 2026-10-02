// Note: page components (Detail, Favorites, Home) are intentionally NOT
// re-exported here. App.tsx loads them via React.lazy() with a direct
// import path; routing them through this barrel would create a static
// import edge (barrel -> page) that defeats route-based code splitting
// (Rollup's INEFFECTIVE_DYNAMIC_IMPORT warning) since almost everything
// in `src/ui` transitively imports from the top-level "@/ui" barrel.
export * from "./Routes";
