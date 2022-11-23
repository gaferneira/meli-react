import {
  addFavorite,
  fetchProducts,
  removeFavorite,
  useAppDispatch,
  useAppSelector,
} from "@/domain";
import { Product } from "@/domain/entities";

const HomeViewModel = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products);
  const favorites = useAppSelector((state) => state.favorites);

  const fetchProductList = () => {
    dispatch(fetchProducts());
  };

  const updateFavorite = (product: Product, setAsFavorite: Boolean) => {
    setAsFavorite
      ? dispatch(addFavorite(product))
      : dispatch(removeFavorite(product));
  };

  return {
    products,
    favorites,
    fetchProductList,
    updateFavorite,
  };
};

export default HomeViewModel;
