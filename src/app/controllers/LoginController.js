const express = require("express");
const res = require("express/lib/response");
const User = require("../models/User");

express.urlencoded({
  extended: true,
});

express.json();

class loginController {
  login(req, res, next) {
    var userid = req.headers.useridlogin;
    var password = req.headers.passwordlogin;

    User.findOne({
      userid: userid,
      password: password,
    })
      .then((data) => {
        if (data) {
          res.json({ messenge: "Đăng nhập thành công", role: data.role });
          // console.log(data)
        } else {
          res.json("Đăng nhập thất bại");
        }
      })
      .catch((err) => {
        res.status(500).json({ messenge: "Lỗi Server", err: err });
      });
  }
}
module.exports = new loginController();
