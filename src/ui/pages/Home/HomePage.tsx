import React from "react";
import { CircularProgress } from "@mui/material";
import { WithHookProps, SelectCountry, Search, ProductsTable } from "@/ui";
import useHomePage from "./useHomePage";
import { getServiceLocator } from "@/core";
import { ErrorMessage } from "@/ui";
import { Empty } from "./components";
import { useTranslation } from "react-i18next";

const hookPage = useHomePage(getServiceLocator().getProductsUseCase());
type HomePageProps = ReturnType<typeof hookPage>;

const HomePage: React.FC<HomePageProps> = ({
  country,
  productState,
  favorites,
  searchStr,
  searchProduct,
  onSelectCountry,
  queryStr,
}: HomePageProps) => {
  const data = productState.data;

  const { t } = useTranslation();

  if (country.code === "") {
    return <SelectCountry onSelectCountry={onSelectCountry} />;
  }

  return (
    <>
      <Search
        onChange={searchProduct}
        placeholder={t("search_placeholder")}
        limit={2}
        string={searchStr}
        storePrevQuery={queryStr}
      />
      {productState.loading && <CircularProgress />}
      {productState.failure && <ErrorMessage failure={productState.failure} />}
      {data && data.length > 0 && (
        <ProductsTable
          products={data}
          favorites={favorites}
        />
      )}
      {!productState.loading && data?.length === 0 && <Empty />}
    </>
  );
};

export default WithHookProps(hookPage, HomePage);
