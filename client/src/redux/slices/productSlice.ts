import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "@/api/index";
import { Product } from "@/types/product.type";

const SLICE_NAME = "product";

interface ProductsState {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const getProducts = createAsyncThunk(
  `${SLICE_NAME}/getProducts`,
  async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
    try {
      const data = await API.getProducts(page, limit);
      return data; // { items, total, page, totalPages }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  },
);

const getOneProduct = createAsyncThunk(
  `${SLICE_NAME}/getOneProduct`,
  async (productId: string, thunkAPI) => {
    try {
      const data = await API.getOneProduct(productId);
      return data; // single product
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch product");
    }
  },
);

const productSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getOneProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOneProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(getOneProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

const { reducer: productReducer, actions } = productSlice;

export { getProducts, getOneProduct };

export const { setPage } = actions;

export default productReducer;
