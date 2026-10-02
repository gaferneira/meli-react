import type React from "react";
import { useState } from "react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import type { Product } from "@/domain";
import useProductTable from "./useProductsTable";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export interface ProductsTableInterface {
  products: Product[];
  favorites: Product[];
}

const PAGE_SIZE = 5;

export const ProductsTable: React.FC<ProductsTableInterface> = ({
  products,
  favorites,
}: ProductsTableInterface) => {
  const [page, setPage] = useState(0);

  const { isFavorite, handleFavoriteChange } = useProductTable(favorites);

  const { t } = useTranslation();

  const paginatedProducts = products.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <div>
      <TableContainer>
        <Table size="small" aria-label={String(t("Products"))}>
          <TableHead>
            <TableRow>
              <TableCell width={50} />
              <TableCell>{t("Link")}</TableCell>
              <TableCell>{t("Title")}</TableCell>
              <TableCell>{t("Price")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id} className="products-table-row">
                <TableCell width={50}>
                  <Checkbox
                    size="small"
                    checked={isFavorite(product)}
                    slotProps={{
                      input: { "aria-label": String(t("Favorites")) },
                    }}
                    onClick={() => {
                      handleFavoriteChange(product);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Link
                    to={`/detail/${product.id}`}
                    state={{ product }}
                  >
                    {t("Details")}
                  </Link>
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={products.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
      />
    </div>
  );
};

export default ProductsTable;
