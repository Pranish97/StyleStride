const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

const addressModel = mongoose.model("Address", addressSchema);
module.exports = addressModel;
