import { ProductsState, useAppSelector } from "@/domain";
import { useState } from "react";

import { match } from "@/core/Either";
import { getProductsUseCase } from "@/core";

const useHomePage = () => {
  const [productState, setProductState] = useState<ProductsState>({
    data: [],
    loading: "idle",
    failure: null,
  });

  const favorites = useAppSelector((state) => state.favorites);

  const searchProduct = async (query: string) => {
    setProductState({ data: null, loading: "pending", failure: null });
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
    setProductState({ data, loading: "idle", failure });
  };

  return {
    productState,
    favorites,
    searchProduct,
  };
};

export default useHomePage;
