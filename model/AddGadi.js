const mongoose = require("mongoose");

const AddCar = new mongoose.Schema({
  carbrand: String,
  carname: String
});

module.exports = mongoose.model("AddCar Data", AddCar);
