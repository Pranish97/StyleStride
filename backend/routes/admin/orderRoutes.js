const express = require("express");
const {
  getAllOrders,
  getOrderDetailsById,
  updateOrderStatus,
} = require("../../controllers/admin/orderController");

const router = express.Router();

router.get("/list", getAllOrders);
router.get("/details/:id", getOrderDetailsById);
router.put("/update/:id", updateOrderStatus);

module.exports = router;
