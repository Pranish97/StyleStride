const productModel = require("../../models/productModel");

const getFilterProduct = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    console.log(req.query);

    let filter = {};

    if (category.length) {
      filter.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filter.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;

      case "price-hightolow":
        sort.price = -1;
        break;

      case "title-atoz":
        sort.title = 1;
        break;

      case "title-ztoa":
        sort.title = -1;
        break;

      default:
        sort.price = 1;
        break;
    }

    const listOfProduct = await productModel.find(filter).sort(sort);

    res.status(200).json({
      message: "All Product",
      data: listOfProduct,
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

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const productDetails = await productModel.findById(id);

    if (!productDetails)
      return res.ststus(404).json({
        message: "Product Not Found",
        success: false,
        error: true,
      });

    res.status(200).json({
      message: "Product Details",
      data: productDetails,
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

module.exports = { getFilterProduct, getProductDetails };
