const mongoose = require("mongoose");

const featuresSchema = new mongoose.Schema(
  {
    image: String,
  },
  {
    timestamps: true,
  }
);

const featuresModel = mongoose.model("Features", featuresSchema);

module.exports = featuresModel;
