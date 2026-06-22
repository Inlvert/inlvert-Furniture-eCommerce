// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import * as API from "@/api/index";
// import { Product } from "@/types/product.type";

// const SLICE_NAME = "product";

// interface ProductsState {
//   items: Product[];
//   total: number;
//   page: number;
//   totalPages: number;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProductsState = {
//   items: [],
//   total: 0,
//   page: 1,
//   totalPages: 1,
//   loading: false,
//   error: null,
// };

// const getProducts = createAsyncThunk(
//   `${SLICE_NAME}/getProducts`,
//   async ({ page, limit }: { page: number; limit: number }, thunkAPI) => {
//     try {
//       const data = await API.getProducts(page, limit);
//       return data; // { items, total, page, totalPages }
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Failed to fetch products");
//     }
//   },
// );

// const getOneProduct = createAsyncThunk(
//   `${SLICE_NAME}/getOneProduct`,
//   async (productId: string, thunkAPI) => {
//     try {
//       const data = await API.getOneProduct(productId);
//       return data; // single product
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Failed to fetch product");
//     }
//   },
// );

// const productSlice = createSlice({
//   name: SLICE_NAME,
//   initialState,
//   reducers: {
//     setPage(state, action) {
//       state.page = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getProducts.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(getProducts.fulfilled, (state, action) => {
//       state.loading = false;
//       state.items = action.payload.items;
//       state.total = action.payload.total;
//       state.page = action.payload.page;
//       state.totalPages = action.payload.totalPages;
//     });
//     builder.addCase(getProducts.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });

//     builder.addCase(getOneProduct.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(getOneProduct.fulfilled, (state, action) => {
//       state.loading = false;
//       state.items = action.payload;
//     });
//     builder.addCase(getOneProduct.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });
//   },
// });

// const { reducer: productReducer, actions } = productSlice;

// export { getProducts, getOneProduct };

// export const { setPage } = actions;

// export default productReducer;

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
  sort: string | null;
  limit: number;
  search?: string;
  configuration?: string;
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
  sort: "date-desc",
  limit: 8,
  search: undefined,
  configuration: undefined,
};

export const getProducts = createAsyncThunk(
  `${SLICE_NAME}/getProducts`,
  async (
    { page, limit, sort = "date-desc", search, configuration }: { page: number; limit: number; sort?: string; search?: string; configuration?: string },
    thunkAPI,
  ) => {
    try {
      const data = await API.getProducts(page, limit, sort || undefined, search, configuration);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch products",
      );
    }
  },
);

export const getOneProduct = createAsyncThunk(
  `${SLICE_NAME}/getOneProduct`,
  async (productId: string, thunkAPI) => {
    try {
      const data = await API.getOneProduct(productId);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch product",
      );
    }
  },
);


export const addProductToCart = createAsyncThunk(
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
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to add product to cart",
      );
    }
  },
);

export const getProductsInCart = createAsyncThunk(
  `${SLICE_NAME}/getProductsInCart`,
  async (_, thunkAPI) => {
    try {
      const data = await API.getProductsInCart();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch cart products",
      );
    }
  },
);

export const updateCartProductQuantity = createAsyncThunk(
  `${SLICE_NAME}/updateCartProductQuantity`,
  async (
    { productId, quantity }: { productId: string; quantity: number },
    thunkAPI,
  ) => {
    try {
      const data = await API.updateCartProductQuantity(productId, quantity);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to update quantity",
      );
    }
  },
);

export const removeProductFromCart = createAsyncThunk(
  `${SLICE_NAME}/removeProductFromCart`,
  async (productId: string, thunkAPI) => {
    try {
      const data = await API.removeProductFromCart(productId);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to remove product",
      );
    }
  },
);

export const clearCart = createAsyncThunk(
  `${SLICE_NAME}/clearCart`,
  async (_, thunkAPI) => {
    try {
      const data = await API.clearCart();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to clear cart",
      );
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
    setSearch(state, action) {
      state.search = action.payload;
    },
    setConfiguration(state, action) {
      state.configuration = action.payload;
    },
  },
  extraReducers: (builder) => {
    // GET PRODUCTS
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
      state.sort = action.meta.arg.sort || "date-desc";
      state.limit = action.meta.arg.limit || 8;
      state.search = action.meta.arg.search;
      state.configuration = action.meta.arg.configuration;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // GET ONE PRODUCT
    builder.addCase(getOneProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOneProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.items = [action.payload]; // wrap in array
    });
    builder.addCase(getOneProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // CART ACTIONS
    const cartActions = [
      addProductToCart,
      getProductsInCart,
      updateCartProductQuantity,
      removeProductFromCart,
      clearCart,
    ];

    cartActions.forEach((thunk) => {
      builder.addCase(thunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(thunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      });
      builder.addCase(thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
