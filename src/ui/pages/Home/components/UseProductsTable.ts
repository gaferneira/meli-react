import React, { useState } from "react";
import { Product } from "@/domain/entities";

const useProductTable = (favorites : Product[] | undefined) => {

  const [selected, setSelected] = useState<Product[]>(favorites || []);

  const isFavorite = (product: Product) =>
    Boolean(selected.find((p) => p.id === product.id));

  const filterProduct = (product: Product) =>
    selected.filter((p) => p.id !== product.id);

  const handleFavoriteChange = (product: Product, clickFavoriteHandler: (product: Product, setAsFavorite: Boolean) => void) => {
    const setAsFavorite = !isFavorite(product);
    clickFavoriteHandler(product, setAsFavorite);
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
