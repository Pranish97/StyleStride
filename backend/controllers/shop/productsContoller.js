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

module.exports = getFilterProduct;
