import { useState } from "react";
import {
  FAILURE,
  ProductsState,
  selectCountry,
  useAppDispatch,
  useAppSelector,
  match,
} from "@/domain";
import { serviceLocator } from "@/core";

const useHomePage = () => {
  const [productState, setProductState] = useState<ProductsState>({
    data: [],
    loading: false,
    failure: null,
  });

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const country = useAppSelector((state) => state.country);

  const searchProduct = async (query: string) => {
    setProductState({ data: null, loading: true, failure: null });
    let data = null;
    let failure = null;
    match(
      await serviceLocator.getProductsUseCase().invoke(country.id, query),
      (_failure) => {
        if (_failure.code != FAILURE.CanceledError) {
          failure = _failure;
        }
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
    searchProduct,
    onSelectCountry,
  };
};

export default useHomePage;
