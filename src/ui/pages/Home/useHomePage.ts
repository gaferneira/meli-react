import { useState } from "react";
import {
  ProductsState,
  selectCountry,
  useAppDispatch,
  useAppSelector,
} from "@/domain";
import { match, serviceLocator } from "@/core";

const useHomePage = () => {
  const [productState, setProductState] = useState<ProductsState>({
    data: [],
    loading: false,
    failure: null,
  });

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const country = useAppSelector((state) => state.country);
  const searchStr = useAppSelector((state) => state.search);

  const searchProduct = async (query: string) => {
    setProductState({ data: null, loading: true, failure: null });

    let data = null;
    let failure = null;
    match(
      await serviceLocator.getProductsUseCase().invoke(country.id, query),
      (_failure) => {
        failure = _failure;
      },
      (_data) => {
        data = _data;
      }
    );
    setProductState({ data, loading: false, failure });
  };

  const onSelectCountry = (code: string) => {
    dispatch(selectCountry(code));
  };

  return {
    country,
    productState,
    favorites,
    searchStr,
    searchProduct,
    onSelectCountry,
  };
};

export default useHomePage;
