const express = require("express");
const {
  addToCart,
  fetchCartItems,
  updateQuantity,
  deleteCartItem,
} = require("../../controllers/shop/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", fetchCartItems);
router.put("/update", updateQuantity);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
