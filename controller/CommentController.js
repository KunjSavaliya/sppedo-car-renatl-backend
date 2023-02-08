const { response } = require("express");
const comment = require("../model/comment");

const comment_data = async (req, res) => {
  const { name, email, message, phone } = req.body;
  comment.findOne({ phone }, (err, user) => {
    //   if (user) {
    //     // res.send({ message: "alerdy" });
    //   } else
    {
      const user = new comment({
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
  comment.find({}, function (err, Product) {
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
