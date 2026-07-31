import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { DataGrid, GridRenderCellParams, GridPaginationModel } from "@mui/x-data-grid";
import { Product } from "@/domain";
import useProductTable from "./useProductsTable";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface ProductsTableInterface {
  products: Product[];
  favorites: Product[];
}

export const ProductsTable: React.FC<ProductsTableInterface> = ({
  products,
  favorites,
}: ProductsTableInterface) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });

  const { isFavorite, handleFavoriteChange } = useProductTable(favorites);

  const { t } = useTranslation();

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
      headerName: t("Link"),
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Link to={`/detail/${params.value}`} state={{ product: params.row }}>
            {t("Details")}
          </Link>
        </>
      ),
    },
    {
      field: "title",
      headerName: t("Title"),
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "price",
      headerName: t("Price"),
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
        disableRowSelectionOnClick
        autoHeight
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5]}
        getRowId={(row: any) => row.id}
      />
    </div>
  );
};

export default ProductsTable;
