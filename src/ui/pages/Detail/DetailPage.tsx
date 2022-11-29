import withHookProps from "@/ui/hoc/WithHookProps";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useDetailPage from "./useDetailPage";

type DetailProps = ReturnType<typeof useDetailPage>;

const DetailPage: React.FC<DetailProps> = ({
  product,
  getProduct,
}: DetailProps) => {
  const params = useParams();
  const { idProduct } = params;

  const Error = () => <div>Error...</div>;
  const Empty = () => <div>There are no products</div>;

  const data = product.data;

  useEffect(() => {
    if (idProduct) getProduct(idProduct);
  }, [idProduct]);

  return (
    <>
      {product.loading === "pending" && <CircularProgress />}
      {product.failure && <Error />}
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
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {data.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {data.price} | {data.thumbnail ?? "vacio"}
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};
export default withHookProps(useDetailPage, DetailPage);
