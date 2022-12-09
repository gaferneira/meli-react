import React from "react";
import { CircularProgress } from "@mui/material";
import { WithHookProps, SelectCountry, Search, ProductsTable } from "@/ui";
import useHomePage from "./useHomePage";
import { ErrorMessage } from "@/ui";
import { Empty } from "./components";
import { useTranslation } from "react-i18next";

type props = ReturnType<typeof useHomePage>;

const HomePage: React.FC<props> = ({
  country,
  productState,
  favorites,
  searchStr,
  searchProduct,
  onSelectCountry,
  queryStr,
}: props) => {
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
        <ProductsTable products={data} favorites={favorites} />
      )}
      {!productState.loading && data?.length === 0 && <Empty />}
    </>
  );
};

export default WithHookProps(useHomePage, HomePage);
