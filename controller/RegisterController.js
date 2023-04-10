const { response } = require("express");
const Registerdata = require("../model/RegsiterData");
const Gmaildata = require("../model/Carbooking");
const crypto = require('crypto');
var nodemailr = require("nodemailer");


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


const sendOTP = async (req, res) => {
  const { email, otp } = req.body;
  const transporter = nodemailr.createTransport({

    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,

    },
  });


  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Forget Password OTP - Sppedo car rental",
    html: `
        <p>Your OTP for Forget Password:</p>
        <h3>${req.body.otp}</h3>
      `


  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent: ${info.messageId}`);
}





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
  sendOTP
  // mail_sender,
  // mail_get,
};
