import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Badge,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import withHookProps from "@/ui/hoc/WithHookProps";
import useDetailPage from "./useDetailPage";
import { getServiceLocator } from "@/core";
import { ErrorMessage } from "@/ui";
import { t } from "i18next";

const hookPage = useDetailPage(getServiceLocator().getProductUseCase());
type DetailProps = ReturnType<typeof hookPage>;

const DetailPage: React.FC<DetailProps> = ({
  product,
  getProduct,
}: DetailProps) => {
  const params = useParams();
  const dataPro = useLocation();
  const { idProduct } = params;
  const initialInfo = dataPro.state.product;

  const data = product.data;

  useEffect(() => {
    if (idProduct) getProduct(idProduct);
  }, [idProduct]);

  return (
    <>
      {product.loading === true && <CircularProgress />}
      {product.failure && <ErrorMessage failure={product.failure} />}
      <div>
        <h2>Product</h2>
        <div>
          <h2>Information product</h2>
          {data && (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={data.thumbnail}
                alt={data.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.price} | {data.thumbnail ?? t("empty")}
                </Typography>
                {initialInfo && (
                  <>
                    <p>quantity: {initialInfo.available_quantity}</p>
                    <p>tags</p>
                    {initialInfo.tags.map((tag: string, index: number) => (
                      <div key={`product-${index}`}>
                        <Badge
                          badgeContent={tag}
                          color="primary"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        ></Badge>
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};
export default withHookProps(hookPage, DetailPage);
