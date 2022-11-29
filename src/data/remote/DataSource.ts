import axios from "axios";
import { Product } from "@/domain";
import { getCancelToken } from "./Utils";
import ApiResponseProducts from "../dto/ApiResponseProducts";
import ApiResponseProduct from "../dto/ApiResponseProduct";

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
  //const endpoint = `/sites/MLC/${country}/search?q=${query}`;
  const endpoint = `/sites/MLC/search?q=${query}`;
  try {
    const response = await axiosInstance.get<ApiResponseProducts>(endpoint, {
      signal: getCancelToken("searchProduct"),
    });
    return response.data.results;
  } catch (err) {
    if (err instanceof Error && err.message === "canceled") return [];
    throw err;
  }
}

export async function getProduct(id: string): Promise<Product> {
  const endpoint = `/items/${id}`;
  try {
    const request = await axiosInstance.get<ApiResponseProduct>(endpoint);
    const response: any = request.data;
    return {
      id: response.id,
      title: response.title,
      price: response.price,
      thumbnail: response.thumbnail,
    };
  } catch (err) {
    throw err;
  }
}
