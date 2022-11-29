import { Product } from "@/domain/entities";
import axios from "axios";
import ApiResponseProducts from "../dto/ApiResponseProducts";

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
  const endpoint = country + "/search?q=" + query;
  try {
    const response = await axiosInstance.get<ApiResponseProducts>(endpoint);
    return response.data.results;
  } catch (err) {
    throw err;
  }
}
