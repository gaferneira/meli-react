import React from "react";
import { CircularProgress } from "@mui/material";
import { WithHookProps, ProductsTable } from "@/ui";
import useHomePage from "./useHomePage";
import { Search } from "@/ui/components/Search";

type HomePageProps = ReturnType<typeof useHomePage>;

const HomePage: React.FC<HomePageProps> = ({
  productState,
  favorites,
  searchProduct,
}: HomePageProps) => {
  const Error = () => <div>Error...</div>;
  const Empty = () => <div>There are no products</div>;

  const data = productState.data;

  return (
    <>
      <Search
        onChange={searchProduct}
        placeholder="Search a product"
        limit={2}
      />
      {productState.loading === "pending" && <CircularProgress />}
      {productState.failure && <Error />}
      {data && data.length > 0 && (
        <ProductsTable
          products={data}
          favorites={favorites}
        />
      )}
      {productState.loading !== "pending" && data?.length === 0 && <Empty />}
    </>
  );
};

export default WithHookProps(useHomePage, HomePage);
