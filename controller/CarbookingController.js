const { response } = require("express");
const Product = require("../model/RegsiterData");
const Carbooking = require("../model/Carbooking");
const mongodb = require("mongodb");

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
  const html=
  `<h1>${req.body.name}</h1>
  <h1>${req.body.car}</h1>
  `
  

  
  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Sppedo car rental",
    html:html
  //  text:message
    
    // text: `Your Name:${req.body.name}, Phone Number:${req.body.phone},CarType:${req.body.car}, Driver Option:${req.body.drive}, Your State:${req.body.state},Gadi Drop Ariya:${req.body.drop}, Gadi Drop Ariya:${req.body.drop}, Gadi Booking date:${req.body.date}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent:" + info.response);
    }
  });

  {
    const user = new Carbooking({
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
  Carbooking.find({}, function (err, Product) {
    if (err) {
      res.send({ message: "dont get data" });
    } else {
      res.send(Product);
    }
  });
  // console.log(req.Product);
};

// get all data
// app.get("/findOne/:id", async (req, res) => {
const Gmail_updateid = async (req, res) => {
  const data = await Carbooking.findOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.send(data);
};
// delete data
// app.delete("/delete/:id", async (req, res) => {
const Gmail_del = async (req, res) => {
  const data = await Carbooking.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.send(data);
};

// update data
// app.put("/update/:id", async (req, res, next) => {
const Gmail_update = async (req, res, next) => {
  console.log("====", req.params.id);
  console.log("----", req.body);
  Carbooking.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        phone:req.body.phone,
        email: req.body.email,
        car: req.body.car,
        state: req.body.state,
        drive: req.body.drive,
        pickup: req.body.pickup,
        drop: req.body.drop,
        date: req.body.date,

        
      
 },
    }
  )
    .then((result) => {
      res.status(200).json({
        User: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = {
  mail_sender,
  mail_get,
  Gmail_data,
  Gmail_updateid,
  Gmail_del,
  Gmail_update,
};
