const mongooes = require("mongoose");

const userSchema = new mongooes.Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongooes.model("User", userSchema);

module.exports = userModel;
