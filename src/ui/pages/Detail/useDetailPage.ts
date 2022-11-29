import { Product, RequestState } from "@/domain";
import { getProductUseCase, match } from "@/core";
import { useState } from "react";

export type ProductState = RequestState<Product>;

const useDetailPage = () => {
  const [product, setProduct] = useState<ProductState>({
    data: null,
    loading: "idle",
    failure: null,
  });
  const getProduct = async (query: string) => {
    setProduct({ ...product, loading: "pending" });
    let data = null;
    let failure = null;
    match(
      await getProductUseCase.invoke(query),
      (_failure) => {
        failure = _failure;
      },
      (_data) => (data = _data)
    );
    setProduct({ ...product, data, loading: "idle" });
  };

  return {
    product,
    getProduct,
  };
};

export default useDetailPage;
