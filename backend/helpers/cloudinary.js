const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dbhfvf3sg",
  api_key: "962989731966333",
  api_secret: "CuZluh_yOEOIz7wSR59CS6ojix4",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
