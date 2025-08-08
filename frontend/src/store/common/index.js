import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const addFeatureImage = createAsyncThunk(
  "/add/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      "http://localhost:5000/api/common/features/add",
      { image }
    );
    return response.data;
  }
);

export const getFeatureImage = createAsyncThunk(
  "/add/getFeatureImage",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/common/features/get"
    );
    return response.data;
  }
);

const featureSlice = createSlice({
  name: "commonFeature",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImage.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default featureSlice.reducer;
