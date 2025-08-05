const paypal = require("../../helpers/paypal");
const cartModel = require("../../models/cartModel");
const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        return res.status(500).json({
          message: "Error While Creating Paypal Payment",
          error: true,
          success: false,
        });
      } else {
        const newlyCreatedOrder = new orderModel({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const apprvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(200).json({
          success: true,
          apprvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
        success: false,
        error: true,
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await productModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Not Enough Stock For this product ${product?.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await cartModel.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      message: "Order Confirmed",
      success: true,
      data: order,
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

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await orderModel.find({ userId });

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

const getOrderDetails = async (req, res) => {
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

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
