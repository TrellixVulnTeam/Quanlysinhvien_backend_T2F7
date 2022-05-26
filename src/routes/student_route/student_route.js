var express = require("express");
var router = express.Router();
const studentController = require("../../app/controllers/StudentController");
const ClassController = require("../../app/controllers/ClassController");
const CourseController = require("../../app/controllers/CourseController");
const departmentController = require("../../app/controllers/DepartmentController");
const Gen_point = require("../../app/controllers/helper/Gen_point");
const StudyresultController = require("../../app/controllers/StudyresultController");
const EthnicAndProvinceController = require("../../app/controllers/EthnicAndProvinceController");

router.use("/user/myaccount", studentController.myaccount);
router.use("/updatestudent/", studentController.updatestudent);
router.use("/class/finduser", ClassController.findUserbyClass);
router.use("/class", ClassController.find);

router.use("/course/resign_course", CourseController.student_resign);
router.use("/course/findbyuser", CourseController.findSchedulebyUser);
router.use("/course/findbycourse", CourseController.findSchedulebyCourse);
router.use("/course", CourseController.getall);

router.use("/department", departmentController.find);

router.post("/checkin/:token", Gen_point.CheckPointLink);

router.use("/studyresult/findbyuser", StudyresultController.getResultbyUser);
router.use(
  "/studyresult/findbycourse",
  StudyresultController.getResultbyCourse
);

module.exports = router;
