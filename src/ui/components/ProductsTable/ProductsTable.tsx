import type React from "react";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import type {
  GridRenderCellParams,
  GridPaginationModel,
  GridColDef,
} from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import type { Product } from "@/domain";
import useProductTable from "./useProductsTable";
import { Link } from "react-router";
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

  const columns: GridColDef<Product>[] = [
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
            slotProps={{ input: { "aria-label": String(t("Favorites")) } }}
            onClick={() => {
              handleFavoriteChange(params.row);
            }}
          />
        </>
      ),
    } as GridColDef<Product>,
    {
      field: "id",
      headerName: String(t("Link")),
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
      headerName: String(t("Title")),
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "price",
      headerName: String(t("Price")),
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
