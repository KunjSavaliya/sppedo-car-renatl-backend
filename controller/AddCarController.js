const { response } = require("express");
const Car = require("../model/AddGadi");
var nodemailr = require("nodemailer");
const mongodb = require("mongodb");


const car_data = async (req, res) => {
  const { carname, carbrand } = req.body;
  Car.findOne({}, (err, user) => {
    {
      const user = new Car({
        carbrand,
        carname
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



const car_value = async (req, res) => {
  Car.find({}, function (err, Product) {
    if (err) {
      res.send({ message: "dont get data" });
    } else {
      res.send(Product);
    }
  });
  // console.log(req.Product);
};


const car_updateid = async (req, res) => {
  const data = await Car.findOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.send(data);
};
// delete data
// app.delete("/delete/:id", async (req, res) => {
const car_del = async (req, res) => {
  const data = await Car.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.send(data);
};

const car_update = async (req, res, next) => {
  console.log("====", req.params.id);
  console.log("----", req.body);
  Car.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        carbrand: req.body.carbrand,
        carname: req.body.carname,




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
  car_data,
  car_value,
  car_del,
  car_updateid,
  car_update
};