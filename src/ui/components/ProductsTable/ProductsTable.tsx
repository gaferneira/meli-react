import React from "react";
import { Checkbox } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Product } from "@/domain";
import useProductTable from "./useProductsTable";
import { Link } from "react-router-dom";

export interface ProductsTableInterface {
  products: Product[];
  favorites: Product[];
}

export const ProductsTable: React.FC<ProductsTableInterface> = ({
  products,
  favorites,
}: ProductsTableInterface) => {
  const pageSize = 5;

  const { isFavorite, handleFavoriteChange } = useProductTable(favorites);

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
            onClick={() => {
              handleFavoriteChange(params.row);
            }}
          />
        </>
      ),
    },
    {
      field: "id",
      headerName: "Link",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Link
            to={`/detail/${params.value}`}
            state={{ product: params.row }}
          >
            Detalle
          </Link>
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
  console.log("render");
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
