import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types/product.type";
import * as API from "@/api/index";

const SLICE_NAME = "cartProduct";

export interface CartItem {
  productId: Product;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartProductState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartProductState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const addProductToCart = createAsyncThunk(
  `${SLICE_NAME}/addProductToCart`,
  async (
    {
      productId,
      quantity,
      color,
      size,
    }: { productId: string; quantity: number; color?: string; size?: string },
    thunkAPI,
  ) => {
    try {
      const data = await API.addProductToCart(productId, quantity, color, size);
      return data;
    } catch (error: any) {
      console.log("ADD TO CART ERROR:", error?.response?.data || error.message);

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to add product",
      );
    }
  },
);

const getProductsInCart = createAsyncThunk(
  `${SLICE_NAME}/getProductsInCart`,
  async (_, thunkAPI) => {
    try {
      const data = await API.getProductsInCart();
      return data;
    } catch (error: any) {
      console.log(
        "GET CART PRODUCTS ERROR:",
        error?.response?.data || error.message,
      );

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch cart products",
      );
    }
  },
);

const updateCartProductQuantity = createAsyncThunk(
  `${SLICE_NAME}/updateCartProductQuantity`,
  async (
    { productId, quantity }: { productId: string; quantity: number },
    thunkAPI,
  ) => {
    try {
      return await API.updateCartProductQuantity(productId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to update quantity",
      );
    }
  },
);

const removeProductFromCart = createAsyncThunk(
  `${SLICE_NAME}/removeProductFromCart`,
  async (productId: string, thunkAPI) => {
    try {
      return await API.removeProductFromCart(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to remove product",
      );
    }
  },
);

const cartProductSlice = createSlice({
  name: "cartProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      console.log("REDUX PAYLOAD:", action.payload);
    });
    builder.addCase(getProductsInCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProductsInCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
    });
    builder.addCase(getProductsInCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateCartProductQuantity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCartProductQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
    });
    builder.addCase(updateCartProductQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(removeProductFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
      state.loading = false;
      // const id = action.payload;
      state.items = action.payload.items;
      state.total = action.payload.total;
    });
    builder.addCase(removeProductFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

const { reducer: cartProductReducer, actions } = cartProductSlice;

export {
  addProductToCart,
  getProductsInCart,
  updateCartProductQuantity,
  removeProductFromCart,
};

export default cartProductReducer;
