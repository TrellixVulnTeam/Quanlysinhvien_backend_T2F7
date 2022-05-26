const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const User = require("../../models/User");

class CheckRole {
  CheckLogin = (permission) => {
    return (req, res, next) => {
      if (req.headers.useridlogin === null) {
        res.json("Bạn chưa đăng nhập");
      } else {
        User.findOne({
          userid: req.headers.useridlogin,
          password: req.headers.passwordlogin,
        }).then((data) => {
          if (data) {
            if (!permission.includes(data.role)) {
              res.status(400).json("Lỗi : không được phép truy cập");
            } else {
              next();
            }
          } else {
            res.json("Tài khoản hoặc mật khẩu sai");
          }
        });
      }
    };
  };
}

module.exports = new CheckRole();
