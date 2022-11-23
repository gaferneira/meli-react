import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

import { LayoutContainer, Navbar, RoutesWithNotFound } from "./ui";
import "@/App.css";

const HomePage = lazy(() => import("@/ui/pages/Home/HomePage"));
const FavoritesPage = lazy(() => import("@/ui/pages/Favorites/FavoritesPage"));
const CartPage = lazy(() => import("@/ui/pages/Cart/CartPage"));

function App() {
  return (
    <LayoutContainer>
      <Suspense
        fallback={
          <>
            <h1>Loading...</h1>
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
                path="/cart"
                element={<CartPage />}
              />
            </RoutesWithNotFound>
          </div>
        </div>
      </Suspense>
    </LayoutContainer>
  );
}

export default App;
