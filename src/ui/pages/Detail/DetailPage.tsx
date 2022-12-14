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
import { ErrorMessage } from "@/ui";
import { useTranslation } from "react-i18next";

type props = ReturnType<typeof useDetailPage>;

const DetailPage: React.FC<props> = ({ product, getProduct }: props) => {
  const params = useParams();
  const dataPro = useLocation();
  const { idProduct } = params;
  const initialInfo = dataPro.state.product;

  const data = product.data;

  const { t } = useTranslation();

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
export default withHookProps(useDetailPage, DetailPage);
