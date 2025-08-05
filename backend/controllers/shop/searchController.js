const productModel = require("../../models/productModel");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        message: "Keyword is Required",
        success: false,
        error: true,
      });
    }

    const regEx = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { brand: regEx },
        { category: regEx },
      ],
    };

    const searchResult = await productModel.find(createSearchQuery);

    res.status(200).json({
      message: "Search Product",
      data: searchResult,
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

module.exports = { searchProducts };
