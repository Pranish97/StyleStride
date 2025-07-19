const express = require("express");
const { upload } = require("../../helpers/cloudinary");
const {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  editProduct,
  deleteProduct,
} = require("../../controllers/admin/productsController");

const router = express.Router();

router.post("/upload-image", upload.single("my-file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/product", fetchAllProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
