import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import ProductsTable from "./components/ProductsTable/ProductsTable";
import useHomePage from "./UseHomePage";

const HomePage: React.FC = () => {
  const {
    products: productsState,
    favorites,
    fetchProductList
  } = useHomePage();

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
          products={data}
          favorites={favorites}
        />
      )}
      {productsState.loading !== "pending" && data?.length === 0 && <Empty />}
    </>
  );
};

export default HomePage;
