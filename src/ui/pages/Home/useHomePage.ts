import { useState } from "react";
import {
  FAILURE,
  match,
  GetProductsUseCase,
  Product,
  RequestState,
} from "@/domain";
import { addSearch, selectCountry, useAppDispatch, useAppSelector } from "@/ui";

export type ProductsState = RequestState<Product[]>;

const useHomePage = (getProducts: GetProductsUseCase) => () => {
  const [productState, setProductState] = useState<ProductsState>({
    data: [],
    loading: false,
    failure: null,
  });

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const country = useAppSelector((state) => state.country);
  const searchStr = useAppSelector((state) => state.search);

  const queryStr = (value: string) => dispatch(addSearch(value));

  const searchProduct = async (query: string) => {
    setProductState({ data: null, loading: true, failure: null });

    let data = null;
    let failure = null;
    match(
      await getProducts.invoke(country.id, query),
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
    searchStr,
    searchProduct,
    onSelectCountry,
    queryStr,
  };
};

export default useHomePage;
