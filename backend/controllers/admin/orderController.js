const orderModel = require("../../models/orderModel");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();

    if (!orders || orders.length === 0) {
      return res.status(400).json({
        message: "No Order Found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "All Orders",
      success: true,
      data: orders,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getOrderDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    const orderDetails = await orderModel.findById(id);

    if (!orderDetails) {
      return res.status(404).json({
        message: "Order Not Found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Order Details",
      data: orderDetails,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
        success: false,
        error: true,
      });
    }

    const updatededOrder = await orderModel.findByIdAndUpdate(id, {
      orderStatus,
    });

    res.status(200).json({
      message: "Order Status Updated Successfully",
      data: updatededOrder,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = { getAllOrders, getOrderDetailsById, updateOrderStatus };
