import React from "react";
import { CircularProgress } from "@mui/material";
import { WithHookProps, SelectCountry, Search, ProductsTable } from "@/ui";
import useHomePage from "./useHomePage";
import { getServiceLocator } from "@/core";

const hookPage = useHomePage(getServiceLocator().getProductsUseCase());
type HomePageProps = ReturnType<typeof hookPage>;

const HomePage: React.FC<HomePageProps> = ({
  country,
  productState,
  favorites,
  searchStr,
  searchProduct,
  onSelectCountry,
}: HomePageProps) => {
  const Error = () => <div>Error...</div>;
  const Empty = () => <div>There are no products</div>;

  const data = productState.data;

  if (country.code === "") {
    return <SelectCountry onSelectCountry={onSelectCountry} />;
  }

  return (
    <>
      <Search
        onChange={searchProduct}
        placeholder="Search a product"
        limit={2}
        string={searchStr}
      />
      {productState.loading && <CircularProgress />}
      {productState.failure && <Error />}
      {data && data.length > 0 && (
        <ProductsTable products={data} favorites={favorites} />
      )}
      {!productState.loading && data?.length === 0 && <Empty />}
    </>
  );
};

export default WithHookProps(hookPage, HomePage);
