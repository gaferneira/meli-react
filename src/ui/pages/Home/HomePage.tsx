import { Product } from "@/domain/entities";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import ProductsTable from "./components/ProductsTable";
import useViewModel from "./HomeViewModel";

export interface HomeInterface {}

const HomePage: React.FC = () => {
  const { productsState, favorites, fetchProductList, updateFavorite } =
    useViewModel();
  const handleFavoriteChange = (product: Product, setAsFavorite: Boolean) => {
    updateFavorite(product, setAsFavorite);
  };
  const Loading = () => <div>Loading...</div>;
  const Error = () => <div>Error...</div>;
  const Empty = () => <div>There are no products</div>;

  const data = productsState.data;

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <>
      {productsState.loading === "pending" && <Loading />}
      {productsState.error && <Error />}
      {data && data.length > 0 && (
        <ProductsTable
          clickFavoriteHandler={handleFavoriteChange}
          products={data}
          favorites={favorites}
        />
      )}
      {productsState.loading !== "pending" && data && data.length === 0 && (
        <Empty />
      )}
    </>
  );
};

export default HomePage;
