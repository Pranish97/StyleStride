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

    const cart = await cartModel.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(400).json({
        message: "Cart Not Found",
        success: false,
        error: true,
      });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      message: "Cart Product",
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
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

const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req?.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        message: "Invaid Data",
        success: false,
        error: true,
      });
    }
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(400).json({
        message: "Cart Not Found",
        success: false,
        error: true,
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        message: "Cart Items not found!",
        error: true,
        success: false,
      });
    }
    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      message: "Cart Product Updated Successfully!",
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
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

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "Invaid Data",
        success: false,
        error: true,
      });
    }

    const cart = await cartModel.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(400).json({
        message: "Cart Not Found",
        success: false,
        error: true,
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      message: "Cart Product Deleted",
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
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

module.exports = { addToCart, fetchCartItems, updateQuantity, deleteCartItem };
