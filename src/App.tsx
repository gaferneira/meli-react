import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Navbar, LayoutContainer, RoutesWithNotFound } from "@/ui";
import "@/App.css";

const HomePage = lazy(() => import("@/ui/pages/Home/HomePage"));
const FavoritesPage = lazy(() => import("@/ui/pages/Favorites/FavoritesPage"));
const DetailPage = lazy(() => import("@/ui/pages/Detail/DetailPage"));

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
                element={<DetailPage />}
              />
            </RoutesWithNotFound>
          </div>
        </div>
      </Suspense>
    </LayoutContainer>
  );
}

export default App;
