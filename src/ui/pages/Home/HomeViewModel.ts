import { addFavorite, fetchProducts, removeFavorite, useAppDispatch, useAppSelector } from "@/domain";
import { Product } from "@/domain/entities";

const HomeViewModel = ()  => {

  const dispatch = useAppDispatch()
  
  const productsState = useAppSelector(state => state.products);
  const favorites = useAppSelector(state => state.favorites);

  const fetchProductList = () => {
    dispatch(fetchProducts());
  }

  const updateFavorite = (product: Product, setAsFavorite:Boolean) => {
    if (setAsFavorite) {
        dispatch(addFavorite(product));
    } else {
        dispatch(removeFavorite(product));
    }
  }

  return {
    productsState,
    favorites,
    fetchProductList,
    updateFavorite
  };
}

export default HomeViewModel