const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const checkUser = await userModel.findOne({ email });

    if (checkUser) {
      res.status(400).json({
        message: "User Already Exists with same email!",
        error: true,
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new userModel({
      userName,
      email,
      password: hashPassword,
    });

    const saveUser = await newUser.save();

    res.status(200).json({
      message: "User Register Successfully!",
      data: saveUser,
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "User Doesnt Exists!",
        success: false,
        error: true,
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    if (!checkPasswordMatch) {
      res.status(400).json({
        message: "Invalid User! Email and Password Doesnt Match!",
        success: false,
        error: true,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        emeil: user.email,
        name: user.userName,
      },
      "TOKEN_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        message: "User Logged In Successfully",
        data: user,
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

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token").json({
      message: "Logout Successfully!",
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

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      message: "Unauthorized User!",
      success: false,
      error: true,
    });
  }

  try {
    const decoded = jwt.verify(token, "TOKEN_SECRET_KEY");

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized User!",
      error: true,
      success: false,
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
