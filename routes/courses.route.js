const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/Courses.controller");
const { validationSchema } = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verfiyToken");
const userRole = require("../utils/userRoles");
const allowedTo = require("../middlewares/allowedTo.js");
// ** CRUD (Create / Read / Update / Delete )

// ** Get All Courses
// ** Route => Resource
router
  .route("/")
  .get(CourseController.GetAllCourses)
  .post(
    verifyToken,
    allowedTo(userRole.MANAGER),
    validationSchema(),
    CourseController.addCourse,
  );

// ** Get Single Course
router
  .route("/:CourseId")
  .get(CourseController.GetSingleCourse)
  .patch(CourseController.updateCourse)
  .delete(
    verifyToken,
    allowedTo(userRole.ADMIN, userRole.MANAGER),
    CourseController.DeleteCourse,
  );

module.exports = router;
