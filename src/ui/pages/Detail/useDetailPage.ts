import { getServiceLocator } from "@/core";
import { GetProductUseCase, match, Product, RequestState } from "@/domain";
import { useState } from "react";

export type ProductState = RequestState<Product>;

const useDetailPage = (
  getProductUseCase: GetProductUseCase = getServiceLocator().getProductUseCase()
) => {
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
      await getProductUseCase.invoke(query),
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
