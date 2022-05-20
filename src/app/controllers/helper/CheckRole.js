const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const User = require("../../models/User");

class CheckRole {
  CheckLogin = (permission) => {
    return (req, res, next) => {
      if (req.body.useridlogin === null) {
        res.status(403).json("Bạn chưa đăng nhập");
      } else {
        User.findOne({
          userid: req.body.useridlogin,
          password: req.body.passwordlogin,
        }).then((data) => {
          if (data) {
            if (!permission.includes(data.role)) {
              res.status(401).json("Lỗi : không được phép truy cập");
            } else {
              next();
            }
          } else {
            res.status(300).json("Bạn chưa đăng nhập");
          }
        });
      }
    };
  };
}

module.exports = new CheckRole();
