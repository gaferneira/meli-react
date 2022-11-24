import {
  addFavorite, removeFavorite,
  useAppDispatch
} from "@/domain";
import { Product } from "@/domain/entities";
import { useState } from "react";

const useProductTable = (favorites : Product[] | undefined) => {

  const dispatch = useAppDispatch();


  const [selected, setSelected] = useState<Product[]>(favorites || []);

  const isFavorite = (product: Product) =>
    Boolean(selected.find((p) => p.id === product.id));

  const filterProduct = (product: Product) =>
    selected.filter((p) => p.id !== product.id);

  const handleFavoriteChange = (product: Product) => {
    const setAsFavorite = !isFavorite(product);
    
    setAsFavorite
      ? dispatch(addFavorite(product))
      : dispatch(removeFavorite(product));

    const filteredProducts = setAsFavorite
      ? [...selected, product]
      : filterProduct(product);
    setSelected(filteredProducts);
  };

  return {
    isFavorite,
    handleFavoriteChange,
  };

};

export default useProductTable;
