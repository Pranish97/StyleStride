const express = require("express");
const {
  getFilterProduct,
  getProductDetails,
} = require("../../controllers/shop/productsController");

const router = express.Router();

router.get("/", getFilterProduct);
router.get("/:id", getProductDetails);

module.exports = router;
