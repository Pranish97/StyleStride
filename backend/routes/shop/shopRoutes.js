const express = require("express");
const getFilterProduct = require("../../controllers/shop/productsContoller");

const router = express.Router();

router.get("/product", getFilterProduct);

module.exports = router;
