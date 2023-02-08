const mongoose = require("mongoose");

const gmailSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  car: String,
  drive: String,
  state: String,
  pickup: String,
  drop: String,
  date: String,
});

module.exports = mongoose.model("Gmaildata", gmailSchema);
