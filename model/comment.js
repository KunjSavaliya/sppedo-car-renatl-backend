const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email: String,
     message: String,

   
});

module.exports = mongoose.model("comment", productSchema);