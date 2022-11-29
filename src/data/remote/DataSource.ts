import { Product } from "@/domain";
import axios from "axios";
import { getCancelToken } from "./Utils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

interface ApiResponse {
  results: Product[];
}

interface ApiResponseProduct {
  data: Product;
}

export async function searchProducts(query: string): Promise<Array<Product>> {
  const endpoint = `/sites/MLC/search?q=${query}`;
  try {
    const response = await axiosInstance.get<ApiResponse>(endpoint, {
      signal: getCancelToken("search"),
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
