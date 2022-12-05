import { ProductsTable, WithHookProps } from "@/ui";
import React from "react";
import { Empty } from "./components";
import useFavoritesPage from "./useFavoritesPage";

const hookPage = useFavoritesPage();
type FavoritesPageProps = ReturnType<typeof hookPage>;

const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
}: FavoritesPageProps) => {
  return (
    <>
      {favorites.length > 0 && (
        <ProductsTable products={favorites} favorites={favorites} />
      )}
      {favorites.length === 0 && <Empty />}
    </>
  );
};

export default WithHookProps(hookPage, FavoritesPage);
