import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "@/api/index";

const SLICE_NAME = "compare";

interface CompareState {
  products: any[]; // You can replace 'any' with a more specific type based on your product structure
  loading: boolean;
  error: Record<string, string>;
  globalError: string | null;
}

const initialState: CompareState = {
  products: [],
  loading: false,
  error: {},
  globalError: null,
};

export const addProductToCompare = createAsyncThunk(
  `${SLICE_NAME}/addProductToCompare`,
  async (productId: string, thunkAPI) => {
    try {
      const response = await API.addProductToCompare(productId);
      console.log("API response for addProductToCompare:", response);

      return response.products;
    } catch (error: any) {
      console.log(
        "ADD TO COMPARE ERROR:",
        error?.response?.data || error.message,
      );

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to add product to compare",
      );
    }
  },
);

export const getAllCompareProducts = createAsyncThunk(
  `${SLICE_NAME}/getAllCompareProducts`,
  async (_, thunkAPI) => {
    try {
      const data = await API.getComparedProducts();
      return data.products;
    } catch (error: any) {
      console.log(
        "GET COMPARE PRODUCTS ERROR:",
        error?.response?.data || error.message,
      );

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch compared products",
      );
    }
  },
);

export const removeProductFromCompare = createAsyncThunk(
  `${SLICE_NAME}/removeProductFromCompare`,
  async (productId: string, thunkAPI) => {
    try {
      await API.removeProductFromCompare(productId);
      return productId;
    } catch (error: any) {
      console.log(
        "REMOVE FROM COMPARE ERROR:",
        error?.response?.data || error.message,
      );

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Failed to remove product from compare",
      );
    }
  },
);

const compareSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProductToCompare.pending, (state) => {
      state.loading = true;
      state.error = {};
    });
    builder.addCase(addProductToCompare.fulfilled, (state, action) => {
      state.loading = false;
      // state.products.push(action.payload);
      const product = action.payload;
      if (!product?._id) return;

      if (!state.products.some((p) => p._id === product._id)) {
        state.products.push(action.payload);
      }
    });
    builder.addCase(addProductToCompare.rejected, (state, action) => {
      state.loading = false;
      const id = action.meta.arg;
      state.error[id] = action.payload as string;
    });

    builder.addCase(getAllCompareProducts.pending, (state) => {
      state.loading = true;
      state.error = {};
    });
    builder.addCase(getAllCompareProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      console.log("action.payload", action.payload);
    });
    builder.addCase(getAllCompareProducts.rejected, (state, action) => {
      state.loading = false;
      state.globalError = action.payload as string;
    });

    builder.addCase(removeProductFromCompare.pending, (state) => {
      state.loading = true;
      state.error = {};
    });
    builder.addCase(removeProductFromCompare.fulfilled, (state, action) => {
      state.loading = false;
      const productId = action.payload;
      state.products = state.products.filter((p) => p._id !== productId);
    });
    builder.addCase(removeProductFromCompare.rejected, (state, action) => {
      state.loading = false;
      const id = action.meta.arg;
      state.error[id] = action.payload as string;
    });

  },
});

const { reducer: compareReducer } = compareSlice;

export default compareReducer;
