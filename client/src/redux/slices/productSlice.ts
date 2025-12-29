import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "@/api/index";

const SLICE_NAME = "product";

interface ProductState {
  products: Array<{ id: number; name: string; price: number }>;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const getProducts = createAsyncThunk(
  `${SLICE_NAME}/getProducts`,
  async (_, thunkAPI) => {
    try {
      const product = await API.getProducts();
      return product;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);
const productSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

const { reducer: productReducer, actions } = productSlice;

export { getProducts };

export default productReducer;
