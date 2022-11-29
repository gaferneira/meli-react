import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { WithHookProps, ProductsTable, SelectCountry } from "@/ui";
import useHomePage from "./useHomePage";

type HomePageProps = ReturnType<typeof useHomePage>;

const HomePage: React.FC<HomePageProps> = ({
  country,
  productState,
  favorites,
  searchProduct,
  onSelectCountry,
}: HomePageProps) => {
  const Error = () => <div>Error...</div>;
  const Empty = () => <div>There are no products</div>;

  const data = productState.data;

  useEffect(() => {
    searchProduct("iphone");
  }, []);

  if (country.code === "") {
    return <SelectCountry onSelectCountry={onSelectCountry} />;
  }

  return (
    <>
      {productState.loading === "pending" && <CircularProgress />}
      {productState.failure && <Error />}
      {data && data.length > 0 && (
        <ProductsTable products={data} favorites={favorites} />
      )}
      {productState.loading !== "pending" && data?.length === 0 && <Empty />}
    </>
  );
};

export default WithHookProps(useHomePage, HomePage);
