const { imageUploadUtil } = require("../../helpers/cloudinary");
const productModel = require("../../models/productModel");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageUploadUtil(url);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newProduct = new productModel({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    const saveProduct = await newProduct.save();

    res.status(200).json({
      message: "Product Added Successfully!",
      data: saveProduct,
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

const fetchAllProduct = async (req, res) => {
  try {
    const listOfProduct = await productModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All Product",
      data: listOfProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: message.error || error,
      error: true,
      success: false,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await productModel.findById(productId);

    if (!findProduct) {
      return res.status(404).json({
        message: "Product Not Found",
        success: false,
        error: true,
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = title || findProduct.totalStock;
    findProduct.image = image || findProduct.title;

    await findProduct.save();

    res.status(200).json({
      message: "Product Updated Successfully!",
      data: findProduct,
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

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await productModel.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully!",
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

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
};
