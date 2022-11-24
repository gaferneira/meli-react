import { ProductsState, useAppSelector } from "@/Domain";
import { useState } from "react";

import { match, getProductsUseCase } from "@/Core";

const useHomePage = () => {
  const [productState, setProductState] = useState<ProductsState>({
    data: [],
    loading: "idle",
    failure: null,
  });

  const favorites = useAppSelector((state) => state.favorites);

  const searchProduct = async (query: string) => {
    setProductState({ ...productState, loading: "pending" });
    let data = null;
    let failure = null;
    match(
      await getProductsUseCase.invoke(query),
      (_failure) => {
        failure = _failure;
      },
      (_data) => {
        data = _data;
      }
    );
    setProductState({ ...productState, data, loading: "idle" });
  };

  return {
    productState,
    favorites,
    searchProduct,
  };
};

export default useHomePage;
