import axios from "axios";
import { Product } from "@/domain";
import { getCancelToken } from "../utils";
import {
  ApiResponseProducts,
  ApiResponseProduct,
  ProductDtoToEntity,
  ProductDto,
} from "../dto";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export async function searchProducts(
  country: string,
  query: string
): Promise<Array<Product>> {
  const endpoint = `/sites/${country}/search?q=${query}`;
  const response = await axiosInstance.get<ApiResponseProducts>(endpoint, {
    signal: getCancelToken("searchProduct"),
  });
  const array: ProductDto[] = response.data.results;
  return array.map((p) => ProductDtoToEntity(p));
}

export async function getProduct(id: string): Promise<Product> {
  const endpoint = `/items/${id}`;
  try {
    const request = await axiosInstance.get<ApiResponseProduct>(endpoint);
    return ProductDtoToEntity(request.data);
  } catch (err) {
    throw err;
  }
}
