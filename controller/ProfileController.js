const { response } = require("express");
const Profile = require("../model/Profile");
const mongodb = require("mongodb");

const Profile_data = async (req, res) => {
    const { name, email, phone, gender, dob, Address, } = req.body;
    Profile.findOne({ phone }, (err, user) => {
        {
            const user = new Profile({
                name,
                phone,
                email,
                message,
                gender,
                dob,
                Address,
            });
            user.save((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ message: "succes" });
                }
            });
        }
    });
    // res.send("my API register")
    console.log(req.body);
};

const contact_del = async (req, res) => {
    const data = await Profile.deleteOne({
        _id: new mongodb.ObjectId(req.params.id),
    });
    res.send(data);
};





const comment_value = async (req, res) => {
    Profile.find({}, function (err, Product) {
        if (err) {
            res.send({ message: "dont get data" });
        } else {
            res.send(Product);
        }
    });
    // console.log(req.Product);
};

module.exports = {
    Profile_data,
    comment_value,
    contact_del
};
