const cartModel = require("../../models/cartModel");
const productModel = require("../../models/productModel");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req?.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        message: "Invaid Data",
        success: false,
        error: true,
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      res.status(404).json({
        message: "Product Not Found!",
        success: false,
        error: true,
      });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({
      message: "Product Added to Cart!",
      succes: true,
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

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "No User Found",
        success: false,
        error: true,
      });
    }

    const cart = await cartModel.findOne(userId).populate({
      path: "item.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(400).json({
        message: "Cart Not Found",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const updateQuantity = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = { addToCart, fetchCartItems, updateQuantity, deleteCartItem };
