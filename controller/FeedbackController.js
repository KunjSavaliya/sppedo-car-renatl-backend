const { response } = require("express");
const Feedback = require("../model/Feedback");

var nodemailr = require("nodemailer");

const Feedback_sender = async (req, res) => {
  const { name, email, message } = req.body;

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
    subject: "Sppedo car rental",
    // text: "hello",
    text: `Your Name:${req.body.name} Message:${req.body.message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent:" + info.response);
    }
  });

  {
    const user = new Feedback({
      name,
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
  console.log(req.body);
};

const feedback_data = async (req, res) => {
  Feedback.find({}, function (err, Product) {
    if (err) {
      res.send({ message: "dont get data" });
    } else {
      res.send(Product);
    }
  });
};
module.exports = {
  Feedback_sender,
  feedback_data,
};
