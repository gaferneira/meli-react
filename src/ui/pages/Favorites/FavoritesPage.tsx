import { ProductsTable, WithHookProps } from "@/ui";
import React from "react";
import { Empty } from "./components";
import useFavoritesPage from "./useFavoritesPage";

type props = ReturnType<typeof useFavoritesPage>;

const FavoritesPage: React.FC<props> = ({ favorites }: props) => {
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
