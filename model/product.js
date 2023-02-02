const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    Phone:String,
    email: String,
    password: String,

   
});

module.exports = mongoose.model("Product", productSchema);




  