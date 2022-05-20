const express = require("express");
const res = require("express/lib/response");
const User = require("../models/User");

express.urlencoded({
  extended: true,
});

express.json();

class loginController {
  login(req, res, next) {
    var userid = req.body.useridlogin;
    var password = req.body.passwordlogin;

    User.findOne({
      userid: userid,
      password: password,
    })
      .then((data) => {
        if (data) {
          res.status(200).json("Đăng nhập thành công");
          // console.log(data)
        } else {
          res.status(300).json("Đăng nhập thất bại");
        }
      })
      .catch((err) => {
        res.status(500).json("Đăng nhập thất bại");
      });
  }
}
module.exports = new loginController();
