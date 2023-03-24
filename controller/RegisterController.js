const { response } = require("express");
const Registerdata = require("../model/RegsiterData");
const Gmaildata = require("../model/Carbooking");

const product_register = async (req, res) => {
  const { name, email, password, Phone } = req.body;
  Registerdata.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "alerdy" });
    } else {
      const user = new Registerdata({
        name,
        Phone,
        email,
        password,
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

const product_forget = async (req, res) => {
  const { password, email } = req.body;
  Registerdata.findOne({ email: email }, (err, Registerdata) => {
    Registerdata.updateOne({
      $set: {
        password: req.body.password,
      },
    })
      .then((result) => {
        res.status(200).json({
          Registerdata: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

  console.log(req.body);
};

const product_userdata = async (req, res) => {
  Registerdata.find({}, function (err, Registerdata) {
    if (err) {
      res.send({ message: "dont get data" });
    } else {
      res.send(Registerdata);
    }
  });
  // console.log(req.Registerdata);
};

module.exports = {
  product_register,
  product_userdata,
  product_forget,
  // mail_sender,
  // mail_get,
};
