import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Product } from "@/domain/entities";

export interface ProductsTableInterface {
  products: Product[];
  favorites: Product[];
  clickFavoriteHandler: (product: Product, setAsFavorite: Boolean) => void;
}

const ProductsTable: React.FC<ProductsTableInterface> = ({
  products,
  favorites,
  clickFavoriteHandler,
}: ProductsTableInterface) => {
  const [selected, setSelected] = useState<Product[]>(favorites ?? []);
  const pageSize = 5;

  const findProduct = (product: Product) =>
    Boolean(selected.find((p) => p.id === product.id));

  const filterProduct = (product: Product) =>
    selected.filter((p) => p.id !== product.id);

  const handleChange = (product: Product) => {
    const setAsFavorite = !findProduct(product);
    clickFavoriteHandler(product, setAsFavorite);
    const filteresProducts = setAsFavorite
      ? [...selected, product]
      : filterProduct(product);
    setSelected(filteresProducts);
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      sortable: false,
      headerName: "",
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <Checkbox
          size="small"
          checked={findProduct(params.row)}
          onClick={() => handleChange(params.row)}
        />
      ),
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value} </>,
    },
  ];

  return (
    <div>
      <DataGrid
        columns={columns}
        rows={products}
        disableColumnSelector
        disableSelectionOnClick
        autoHeight
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        getRowId={(row: any) => row.id}
      />
    </div>
  );
};

export default ProductsTable;
