const mongoose = require("mongoose");

const Profile = new mongoose.Schema({
    name: String,
    Phone: String,
    email: String,
    gender: String,
    dob: Number,
    Address: String,
});

module.exports = mongoose.model("Profile Data", Profile);
