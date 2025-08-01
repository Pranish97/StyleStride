const express = require("express");
const {
  fetchAllAddress,
  addAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/addressController");

const router = express.Router();

router.get("/:userId", fetchAllAddress);
router.post("/add", addAddress);
router.put("/edit/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

module.exports = router;
