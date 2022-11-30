import { ProductsTable, WithHookProps } from "@/ui";
import React from "react";
import useFavoritesPage from "./useFavoritesPage";

type FavoritesPageProps = ReturnType<typeof useFavoritesPage>;

const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
}: FavoritesPageProps) => {
  const Empty = () => <div>There are no favorites</div>;

  return (
    <>
      {favorites.length > 0 && (
        <ProductsTable products={favorites} favorites={favorites} />
      )}
      {favorites.length === 0 && <Empty />}
    </>
  );
};

export default WithHookProps(useFavoritesPage, FavoritesPage);
