const mongoose = require("mongoose");

const Register = new mongoose.Schema({
  name: String,
  Phone: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Register Data", Register);
