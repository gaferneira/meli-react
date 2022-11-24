import { Product } from "@/Domain";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

interface ApiResponseProducts {
  results: Product[];
}
interface ApiResponseProduct {
  data: Product;
}

export async function searchProducts(query: string): Promise<Array<Product>> {
  const endpoint = `/sites/MLC/search?q=${query}`;
  try {
    const response = await axiosInstance.get<ApiResponseProducts>(endpoint);
    return response.data.results;
  } catch (err) {
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
