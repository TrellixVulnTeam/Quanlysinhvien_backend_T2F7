const { render } = require("express/lib/response");
const Class = require("../../models/Class");
const Course = require("../../models/Course");
const Department = require("../../models/Department");
const User = require("../../models/User");
const convert = require("./Convert");
const jwt = require("jsonwebtoken");
const { search } = require("../../../routes/home");
require("dotenv").config();
const secret = process.env.secret_password;

var today = new Date();
var nextday = new Date().setDate(today.getDate() + 1);
// var lastday = new Date().setDate(today.getDate() - 1);

class Gen_point {
  GetPointLink(req, res, next) {
    convert.ConvertCourse(req.body.courseid).then((course_id) => {
      console.log(today);
      Course.findOne({
        course_id: course_id,
        "schedule.Date": { $gt: today, $lte: nextday },
        "schedule.start": req.body.start,
      })
        .then((data) => {
          if (data) {
            var token = jwt.sign(
              {
                course_id: data.course_id,
                start: req.body.start,
                Date: data.Date,
              },
              secret,
              { expiresIn: "1h" }
            );
            res.status(200).json({
              link:
                "http://localhost:3000/student/qlsv/checkin/" + String(token),
            });
          } else {
            res.status(404).json("Không tìm thấy tiết học");
          }
        })
        .catch((err) => {
          res.status(500).json("Lỗi server");
        });
    });
  }

  CheckPointLink(req, res, next) {
    jwt.verify(req.params.token, secret, (err, decode) => {
      if (!err) {
        convert
          .ConvertUser(req.body.useridlogin)
          .then((user_id) => {
            let ornuserid = user_id;
            let userobjid = user_id.toString();
            Course.find({
              course_id: decode.course_id,
              "studentsdetail.user_id": user_id,
            }).then((data) => {
              if (data) {
                var checklog = data[0].schedule.find(
                  (check) =>
                    check.Date >= today &&
                    check.Date <= nextday &&
                    check.start === decode.start
                );

                var checklog_json = checklog.Checked_in;
                checklog_json = JSON.stringify(checklog_json);

                if (checklog_json.includes(userobjid)) {
                  res.status(200).json("Bạn đã điểm danh rồi");
                } else {
                  console.log(userobjid);
                  Course.findOneAndUpdate(
                    {
                      course_id: decode.course_id,
                    },
                    { $push: { "schedule.$[schedule].Checked_in": userobjid } },
                    {
                      arrayFilters: [
                        {
                          "schedule.Date": { $gt: today, $lte: nextday },
                          "schedule.start": decode.start,
                        },
                      ],
                    }
                  )
                    .then(
                      Course.findOneAndUpdate(
                        {
                          course_id: decode.course_id,
                        },
                        {
                          $inc: {
                            "studentsdetail.$[studentsdetail].check_point": 1,
                          },
                        },
                        {
                          arrayFilters: [
                            {
                              "studentsdetail.user_id": userobjid,
                            },
                          ],
                        }
                      ).then((data) => {
                        if (data) {
                          res.status(200).json("Điểm danh thành công");
                        } else {
                          res.status(300).json("Điểm danh thất bại");
                        }
                      })
                    )

                    .catch((err) =>
                      res.status(500).json({
                        messange: "Lỗi server",
                        err: err,
                      })
                    );
                }
              } else {
                res
                  .status(404)
                  .json("Bạn không có trong danh sách lớp học này");
              }
            });
          })
          .catch(err);
      } else {
        res.status(400).json("Lỗi Server");
      }
    });
  }
}

module.exports = new Gen_point();
