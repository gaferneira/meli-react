import { searchProducts } from "@/data";
import { analyzeException, Product, RequestState } from "@/domain";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProductsState = RequestState<Product[]>;

const initialState: ProductsState = {
  data: [] as Product[],
  loading: false,
  failure: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return await searchProducts("MLC", "iphone");
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        if (state.loading === false) {
          state.loading = true;
        }
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          if (state.loading === true) {
            state.loading = false;
          }
          state.data = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        if (state.loading === true) {
          state.loading = false;
          state.failure = analyzeException(action.error);
        }
      });
  },
});
