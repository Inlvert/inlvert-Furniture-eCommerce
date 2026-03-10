import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "@/api/index";

const SLICE_NAME = "order";

interface OrderState {
  loading: boolean;
  error: string | null;
  items?: any[]; // You can define a more specific type based on your order structure
}

const initialState: OrderState = {
  loading: false,
  error: null,
  items: [],
};

const createOrder = createAsyncThunk(
  `${SLICE_NAME}/createOrder`,
  async (orderData: any, thunkAPI) => {
    try {
      const data = await API.createOrder(orderData);

      return data;
    } catch (error: any) {
      console.log(
        "CREATE ORDER ERROR:",
        error?.response?.data || error.message,
      );

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to create order",
      );
    }
  },
);

const orderSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload; // Assuming the API returns the created order or a list of orders
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.log("CREATE ORDER REJECTED:", action.payload);
      });
  },
});

const { reducer: orderReducer, actions } = orderSlice;

export { createOrder };

export default orderReducer;
