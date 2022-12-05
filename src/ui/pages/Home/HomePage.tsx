import React from "react";
import { CircularProgress } from "@mui/material";
import { WithHookProps, SelectCountry, Search, ProductsTable } from "@/ui";
import useHomePage from "./useHomePage";
import { getServiceLocator } from "@/core";
import { ErrorMessage } from "@/ui";
import { Empty } from "./components";
import { t } from "i18next";

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
  const data = productState.data;

  if (country.code === "") {
    return <SelectCountry onSelectCountry={onSelectCountry} />;
  }

  return (
    <>
      <Search
        onChange={searchProduct}
        placeholder={t("Search a product")}
        limit={2}
        string={searchStr}
      />
      {productState.loading && <CircularProgress />}
      {productState.failure && <ErrorMessage failure={productState.failure} />}
      {data && data.length > 0 && (
        <ProductsTable products={data} favorites={favorites} />
      )}
      {!productState.loading && data?.length === 0 && <Empty />}
    </>
  );
};

export default WithHookProps(hookPage, HomePage);
