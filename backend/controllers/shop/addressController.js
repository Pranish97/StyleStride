const addressModel = require("../../models/addressModel");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        message: "Invalid Data",
        success: false,
        error: true,
      });
    }

    const newAddress = new addressModel({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();

    res.status(200).json({
      message: "Address Added Successfully!",
      data: newAddress,
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

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(404).json({
        message: "User not found!",
        success: false,
        error: true,
      });
    }

    const addressList = await addressModel.find({ userId });

    res.status(200).json({
      message: "All Address",
      data: addressList,
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

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      res.status(400).json({
        message: "User and Address is Required!",
        success: false,
        error: true,
      });
    }

    const address = await addressModel.findOneAndUpdate(
      {
        _id: addressId._id,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      res.status(404).json({
        message: "Address Not Found!",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Address Updated Successfully!",
      data: address,
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

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      res.status(404).json({
        message: "User or Address Not Found!",
        success: false,
        error: true,
      });
    }

    const deleteAddress = await addressModel.findOneAndDelete({
      userId,
      _id: addressId,
    });

    if (!deleteAddress) {
      res.status(404).json({
        message: "Address Not Found!",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Address Deleted Successfully!",
      data: [],
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

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
