"use client";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import cartProductReducer from "./slices/cartProductSlise";

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cartProduct: cartProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
