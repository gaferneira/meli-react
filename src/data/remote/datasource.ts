import { Product } from "@/domain/entities";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.mercadolibre.com/sites/MLC/",
  headers: {
    "Content-type": "application/json",
  },
});

interface ApiResponse {
  results : Product[]
}

export async function getProducts(): Promise<Array<Product>> {
  const endpoint = 'search?q=iphone';
  try {
    const response = await axiosInstance.get<ApiResponse>(endpoint);
    return response.data.results;
  } catch (err) {
    throw err;
  }
}
