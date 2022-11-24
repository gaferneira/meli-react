import { Product } from "@/domain/entities";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

interface ApiResponse {
  results: Product[];
}

export async function searchProducts(query: string): Promise<Array<Product>> {
  const endpoint = "search?q="+query;
  try {
    const response = await axiosInstance.get<ApiResponse>(endpoint);
    return response.data.results;
  } catch (err) {
    throw err;
  }
}
