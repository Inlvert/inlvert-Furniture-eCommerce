"use client";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import cartProductReducer from "./slices/cartProductSlise";
import reviewReducer from "./slices/reviewSlice";
import cartPreviewReducer from "./slices/cartPreviewSlice";
import orderReducer from "./slices/orderSlice";


export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cartProduct: cartProductReducer,
    reviews: reviewReducer,
    cartPreview: cartPreviewReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
