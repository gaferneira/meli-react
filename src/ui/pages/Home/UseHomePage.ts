import {
  fetchProducts,
  useAppDispatch,
  useAppSelector,
} from "@/domain";

const useHomePage = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products);
  const favorites = useAppSelector((state) => state.favorites);

  const fetchProductList = () => {
    dispatch(fetchProducts());
  };

  return {
    products,
    favorites,
    fetchProductList
  };
};

export default useHomePage;
