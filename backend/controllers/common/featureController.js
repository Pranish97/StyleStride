const featuresModel = require("../../models/featuresModel");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const fetureImages = new featuresModel({ image });

    await fetureImages.save();

    res.status(200).json({
      message: "Features Added Successfully",
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

const getFeatureImage = async (req, res) => {
  try {
    const features = await featuresModel.find();

    res.status(200).json({
      message: "All Features",
      data: features,
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

module.exports = { addFeatureImage, getFeatureImage };
