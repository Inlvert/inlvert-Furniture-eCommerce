import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "@/api/index";

const SLICE_NAME = "reviews";

interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
}

interface ReviewState {
  loading: boolean;
  error: string | null;
  reviews: Review[];
}

const initialState: ReviewState = {
  loading: false,
  error: null,
  reviews: [],
};

export const createReview = createAsyncThunk<
  Review,
  { productId: string; rating: number; comment: string },
  { rejectValue: string }
>(`${SLICE_NAME}/createReview`, async (reviewData, thunkAPI) => {
  try {
    const data = await API.createReview(reviewData);
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to submit review";
    return thunkAPI.rejectWithValue(message);
  }
});

const reviewSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reviewSlice.reducer;
