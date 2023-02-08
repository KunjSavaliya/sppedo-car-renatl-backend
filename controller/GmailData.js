const { response } = require("express");
const Product = require("../model/product");
const Gmaildata = require("../model/Gmail");

var nodemailr = require("nodemailer");

const mail_sender = async (req, res) => {
  const { name, phone, email, car, drive, state, pickup, drop, date } =
    req.body;

  var transporter = nodemailr.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "car rental",
    text: `Your Name:${req.body.name}, Phone Number:${req.body.phone},CarType:${req.body.car}, Driver Option:${req.body.drive}, Your State:${req.body.state},Gadi Drop Ariya:${req.body.drop}, Gadi Drop Ariya:${req.body.drop}, Gadi Booking date:${req.body.date}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent:" + info.response);
    }
  });
  // const { name, phone, email, car, drive, pickup, drop, date } = req.body;
  {
    const user = new Gmaildata({
      name,
      phone,
      email,
      car,
      state,
      drive,
      pickup,
      drop,
      date,
    });
    user.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "succes" });
      }
    });
  }
  console.log(req.body);
};

const mail_get = async (req, res) => {
  mail_sender()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
};

const Gmail_data = async (req, res) => {
  Gmaildata.find({}, function (err, Product) {
    if (err) {
      res.send({ message: "dont get data" });
    } else {
      res.send(Product);
    }
  });
  // console.log(req.Product);
};
module.exports = {
  mail_sender,
  mail_get,
  Gmail_data,
};
