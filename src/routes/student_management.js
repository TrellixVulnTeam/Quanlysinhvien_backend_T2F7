var express = require("express");
const CheckRole = require("../app/controllers/helper/CheckRole");
var router = express.Router();
const studentController = require("../app/controllers/StudentController");
const checkrole = require("../app/controllers/helper/CheckRole");
const ClassController = require("../app/controllers/ClassController");
const CourseController = require("../app/controllers/CourseController");
const departmentController = require("../app/controllers/DepartmentController");
const Gen_point = require("../app/controllers/helper/Gen_point");
const StudyresultController = require("../app/controllers/StudyresultController");
const EthnicAndProvinceController = require("../app/controllers/EthnicAndProvinceController");

router.use(
  "/adduser",
  checkrole.CheckLogin(["admin"]),
  studentController.adduser
);
router.use(
  "/user/delete/:id",
  checkrole.CheckLogin(["admin"]),
  studentController.delete
);
router.use(
  "/user/myaccount",
  checkrole.CheckLogin(["admin", "student"]),
  studentController.myaccount
);
router.use(
  "/user/:id",
  checkrole.CheckLogin(["admin"]),
  studentController.user
);
router.use("/user", checkrole.CheckLogin(["admin"]), studentController.find);
router.use(
  "/user/updatestudent/:id",
  checkrole.CheckLogin(["admin"]),
  studentController.updateadmin
);
router.use(
  "/user/updatestudent/:id",
  checkrole.CheckLogin(["student"]),
  studentController.updatestudent
);

router.use(
  "/class/addclass",
  checkrole.CheckLogin(["admin"]),
  ClassController.addclass
);
router.use(
  "/class/finduser",
  checkrole.CheckLogin(["admin", "student"]),
  ClassController.findUserbyClass
);
router.use(
  "/class/delete/:id",
  checkrole.CheckLogin(["admin"]),
  ClassController.delete
);
router.use(
  "/class/updateclass/:id",
  checkrole.CheckLogin(["admin"]),
  ClassController.updateadmin
);
router.use(
  "/class",
  checkrole.CheckLogin(["admin", "student"]),
  ClassController.find
);

router.use(
  "/course/addcourse",
  checkrole.CheckLogin(["admin"]),
  CourseController.addcourse
);
router.use(
  "/course/delete/:id",
  checkrole.CheckLogin(["admin"]),
  CourseController.delete
);
router.use(
  "/course/updatecourse/:id",
  checkrole.CheckLogin(["admin"]),
  CourseController.updateadmin
);
router.use(
  "/course/resign_course",
  checkrole.CheckLogin(["student"]),
  CourseController.student_resign
);
router.use(
  "/course/findbyuser",
  checkrole.CheckLogin(["admin"]),
  CourseController.findSchedulebyUser
);
router.use(
  "/course/findbycourse",
  checkrole.CheckLogin(["admin", "student"]),
  CourseController.findSchedulebyCourse
);
router.use(
  "/course",
  checkrole.CheckLogin(["admin", "student"]),
  CourseController.find
);

router.use(
  "/adddepartment",
  checkrole.CheckLogin(["admin"]),
  departmentController.adddepartment
);
router.use(
  "/department/:id",
  checkrole.CheckLogin(["admin"]),
  departmentController.updateadmin
);
router.use(
  "/adddepartment/updatedepartment/:id",
  checkrole.CheckLogin(["admin"]),
  departmentController.updateadmin
);
router.use(
  "/department",
  checkrole.CheckLogin(["admin", "student"]),
  departmentController.find
);

router.use("/getlink", checkrole.CheckLogin(["admin"]), Gen_point.GetPointLink);
router.use(
  "/checkin/:token",
  checkrole.CheckLogin(["student"]),
  Gen_point.CheckPointLink
);

router.use(
  "/studyresult/findbyuser",
  checkrole.CheckLogin(["admin", "student"]),
  StudyresultController.getResultbyUser
);
router.use(
  "/studyresult/findbycourse",
  checkrole.CheckLogin(["admin", "student"]),
  StudyresultController.getResultbyCourse
);

router.use(
  "/Ethnic/add",
  checkrole.CheckLogin(["admin"]),
  EthnicAndProvinceController.addEthnic
);
router.use(
  "/Ethnic/delete",
  checkrole.CheckLogin(["admin"]),
  EthnicAndProvinceController.removeEthnic
);
router.use(
  "/Ethnic/update",
  checkrole.CheckLogin(["admin"]),
  EthnicAndProvinceController.updateEthnic
);

router.use(
  "/Province/add",
  checkrole.CheckLogin(["admin"]),
  ProvinceAndProvinceController.addProvince
);
router.use(
  "/Province/delete",
  checkrole.CheckLogin(["admin"]),
  ProvinceAndProvinceController.removeProvince
);
router.use(
  "/Province/update",
  checkrole.CheckLogin(["admin"]),
  ProvinceAndProvinceController.updateProvince
);

module.exports = router;
