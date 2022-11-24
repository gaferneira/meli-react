import { searchProducts } from "@/data";
import { Product, RequestState } from "@/domain/entities";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProductsState = RequestState<Product[]>;

const initialState: ProductsState = {
  data: [] as Product[],
  loading: "idle",
  failure: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return await searchProducts("iphone");
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          if (state.loading === "pending") {
            state.loading = "idle";
          }
          state.data = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
          state.failure = action.error
            ? {
                message: action.error.message || "",
                code: action.error.code || "",
              }
            : null;
        }
      });
  },
});
