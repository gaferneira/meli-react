import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Product } from "@/domain/entities";
import useProductTable from "./UseProductsTable";

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

  const pageSize = 5;

  const {
    isFavorite,
    handleFavoriteChange
  } = useProductTable(favorites);

  const columns = [
    {
      field: "actions",
      type: "actions",
      sortable: false,
      headerName: "",
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Checkbox
            size="small"
            checked={isFavorite(params.row)}
            onClick={() => {handleFavoriteChange(params.row, clickFavoriteHandler)}}
          />
        </>
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
