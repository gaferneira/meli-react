import { Product, RequestState } from "@/domain";
import { match, serviceLocator } from "@/core";
import { useState } from "react";

export type ProductState = RequestState<Product>;

const useDetailPage = () => {
  const [product, setProduct] = useState<ProductState>({
    data: null,
    loading: false,
    failure: null,
  });
  const getProduct = async (query: string) => {
    setProduct({ ...product, loading: true });
    let data = null;
    let failure = null;
    match(
      await serviceLocator.getProductUseCase().invoke(query),
      (_failure) => {
        failure = _failure;
      },
      (_data) => (data = _data)
    );
    setProduct({ ...product, data, loading: false, failure });
  };

  return {
    product,
    getProduct,
  };
};

export default useDetailPage;
