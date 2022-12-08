import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const getSearchProductsEndpoint = (country: string, query: string) =>
  `/sites/${country}/search?q=${query}`;

export const getProductEndpoint = (id: string) => `/items/${id}`;
