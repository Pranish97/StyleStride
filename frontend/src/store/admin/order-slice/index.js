import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrder = createAsyncThunk("/admin/getAllOrder", async () => {
  const response = await axios.get(
    `http://localhost:5000/api/admin/orders/list`
  );

  return response.data;
});

export const getOrderDetailsById = createAsyncThunk(
  "admin/getOrderDetailsById",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updataOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/update/${id}`,
      orderStatus
    );

    return response.data;
  }
);

const AdminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsById.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;
