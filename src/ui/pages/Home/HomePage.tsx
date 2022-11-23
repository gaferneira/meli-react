import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Product } from "@/domain/entities";
import ProductsTable from "./components/ProductsTable";
import useViewModel from "./HomeViewModel";

const HomePage: React.FC = () => {
  const {
    products: productsState,
    favorites,
    fetchProductList,
    updateFavorite,
  } = useViewModel();

  const handleFavoriteChange = (product: Product, setAsFavorite: Boolean) => {
    updateFavorite(product, setAsFavorite);
  };

  const Error = () => <div>Error...</div>;
  const Empty = () => <div>There are no products</div>;

  const data = productsState.data;

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <>
      {productsState.loading === "pending" && <CircularProgress />}
      {productsState.error && <Error />}
      {data && data.length > 0 && (
        <ProductsTable
          clickFavoriteHandler={handleFavoriteChange}
          products={data}
          favorites={favorites}
        />
      )}
      {productsState.loading !== "pending" && data?.length !== 0 && <Empty />}
    </>
  );
};

export default HomePage;
