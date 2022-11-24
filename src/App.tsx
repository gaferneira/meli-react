import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import { LayoutContainer, Navbar, RoutesWithNotFound } from "@/UI";
import "@/App.css";

const HomePage = lazy(() => import("@/ui/pages/Home/HomePage"));
const FavoritesPage = lazy(() => import("@/ui/pages/Favorites/FavoritesPage"));
const DetailProduct = lazy(
  () => import("@/UI/pages/DetailProduct/DetailProductPage")
);

function App() {
  return (
    <LayoutContainer>
      <Suspense
        fallback={
          <>
            <CircularProgress />
          </>
        }
      >
        <div className="App">
          <Navbar />
          <div className="container">
            <RoutesWithNotFound>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/favorites"
                element={<FavoritesPage />}
              />
              <Route
                path="/detail/:idProduct"
                element={<DetailProduct />}
              />
            </RoutesWithNotFound>
          </div>
        </div>
      </Suspense>
    </LayoutContainer>
  );
}

export default App;
