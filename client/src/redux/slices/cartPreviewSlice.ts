import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
}

interface CartPreviewState {
  isOpen: boolean;
  product: Product | null;
}

const initialState: CartPreviewState = {
  isOpen: false,
  product: null,
};

const cartPreviewSlice = createSlice({
  name: "cartPreview",
  initialState,
  reducers: {
    showPreview(state, action: PayloadAction<Product>) {
      state.isOpen = true;
      state.product = action.payload;
    },
    hidePreview(state) {
      state.isOpen = false;
    },
  },
});

const {reducer: cartPreviewReducer, actions} = cartPreviewSlice;
export const { showPreview, hidePreview } = actions;

export default cartPreviewReducer;