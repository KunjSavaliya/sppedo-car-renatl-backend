const { response } = require("express");
const Contact = require("../model/Contact");

const comment_data = async (req, res) => {
  const { name, email, message, phone } = req.body;
  Contact.findOne({ phone }, (err, user) => {
    //   if (user) {
    //     // res.send({ message: "alerdy" });
    //   } else
    {
      const user = new Contact({
        name,
        phone,
        email,
        message,
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

const comment_value = async (req, res) => {
  Contact.find({}, function (err, Product) {
    if (err) {
      res.send({ message: "dont get data" });
    } else {
      res.send(Product);
    }
  });
  // console.log(req.Product);
};

module.exports = {
  comment_data,
  comment_value,
};
