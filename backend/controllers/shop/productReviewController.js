const orderModel = require("../../models/orderModel");
const productModel = require("../../models/productModel");
const reviewModel = require("../../models/reviewModel");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await orderModel.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "delivered",
    });

    console.log(order);

    if (!order) {
      return res.status(403).json({
        message: "You need To Purchase Product First",
        success: false,
        error: true,
      });
    }

    const checkExistingReview = await reviewModel.findOne({
      productId,
      userId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        message: "You Have Already Review this Product",
        success: false,
        error: true,
      });
    }

    const newReview = new reviewModel({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await reviewModel.find({ productId });
    const totalReviewLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewLength;

    await productModel.findById(productId, { averageReview });

    res.status(200).json({
      message: "Review Added Successfully!",
      data: newReview,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await reviewModel.find({ productId });

    res.status(200).json({
      message: "Reviews",
      data: reviews,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = { addProductReview, getProductReviews };
