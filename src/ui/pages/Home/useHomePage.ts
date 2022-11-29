import { useState } from "react";
import { ProductsState, selectCountry, useAppDispatch, useAppSelector } from "@/domain";
import { match, getProductsUseCase } from "@/core";

const useHomePage = () => {
  const [productState, setProductState] = useState<ProductsState>({
    data: [],
    loading: "idle",
    failure: null,
  });

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const country = useAppSelector((state) => state.country);

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

	const onSelectCountry = (code: string) => {
		dispatch(selectCountry(code))
	}

  return {
    country,
    productState,
    favorites,
    searchProduct,
    onSelectCountry
  };
};

export default useHomePage;
