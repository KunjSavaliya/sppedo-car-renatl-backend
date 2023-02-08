const { response } = require("express");
const Product = require("../model/product");
const Gmaildata = require("../model/Gmail");

// var nodemailr = require("nodemailer");

// const mail_sender = async (req, res) => {
//   const { name, phone, email, car, drive, pickup, drop, date } = req.body;

//   var transporter = nodemailr.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });

//   var mailOptions = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: "car rental",
//     text: `Your Name:${req.body.name}, Phone Number:${req.body.phone},CarType:${req.body.car}, Driver Option:${req.body.drive}, Gadi Pickup Ariya:${req.body.pickup}, Gadi Drop Ariya:${req.body.drop}, Gadi Booking date:${req.body.date}`,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email Sent:" + info.response);
//     }
//   });
//   // const { name, phone, email, car, drive, pickup, drop, date } = req.body;
//   {
//     const user = new Gmaildata({
//       name,
//       phone,
//       email,
//       car,
//       drive,
//       pickup,
//       drop,
//       date,
//     });
//     user.save((err) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send({ message: "succes" });
//       }
//     });
//   }
//   console.log(req.body);
// };

// const mail_get = async (req, res) => {
//   mail_sender()
//     .then((response) => res.send(response.message))
//     .catch((error) => res.status(500).send(error.message));
// };

const product_register = async (req, res) => {
  const { name, email, password, Phone } = req.body;
  Product.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "alerdy" });
    } else {
      const user = new Product({
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
  Product.findOne({ email: email }, (err, Product) => {
    Product.updateOne({
      $set: {
        password: req.body.password,
      },
    })
      .then((result) => {
        res.status(200).json({
          Product: result,
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
  Product.find({}, function (err, Product) {
    if (err) {
      res.send({ message: "dont get data" });
    } else {
      res.send(Product);
    }
  });
  // console.log(req.Product);
};

module.exports = {
  product_register,
  product_userdata,
  product_forget,
  // mail_sender,
  // mail_get,
};
