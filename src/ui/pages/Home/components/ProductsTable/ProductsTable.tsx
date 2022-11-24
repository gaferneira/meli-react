import React from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Product } from "@/domain/entities";
import useProductTable from "./UseProductsTable";
import { currencyFormat } from "@/UI/Utils/Helpers";

export interface ProductsTableInterface {
  products: Product[];
  favorites: Product[];
}

const ProductsTable: React.FC<ProductsTableInterface> = ({
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
          <Link to={`/detail/${params.value}`}>Detalle</Link>
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
      renderCell: (params: GridRenderCellParams) => (
        <>{currencyFormat(params.value)} </>
      ),
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
