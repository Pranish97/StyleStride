import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviewData: [],
};

export const addProductReview = createAsyncThunk(
  "/shop/addProductReview",
  async (reviewData) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/review/add`,
      reviewData
    );
    return response.data;
  }
);

export const getProductReview = createAsyncThunk(
  "/shop/getProductReview",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/review/${id}`
    );
    return response.data;
  }
);

const shopReviewSlice = createSlice({
  name: "shopReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewData = action.payload.data;
      })
      .addCase(getProductReview.rejected, (state) => {
        state.isLoading = false;
        state.reviewData = [];
      });
  },
});

export default shopReviewSlice.reducer;
