import { createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "cartPreview";

interface CartPreviewState {
  isOpen: boolean;
}

const initialState: CartPreviewState = {
  isOpen: false,
};

const cartPreviewSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    showPreview(state) {
      state.isOpen = true;
    },
    hidePreview(state) {
      state.isOpen = false;
    },
  },
});

const {reducer: cartPreviewReducer, actions} = cartPreviewSlice;
export const { showPreview, hidePreview } = actions;

export default cartPreviewReducer;