const express = require("express");
const { route } = require("express/lib/application");

const router = express.Router({ mergeParams: true });

const {
  getCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const Courses = require("../models/Course");
const advancedResult = require("../middleware/advancedResult");

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResult(Courses, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), addCourse);

router
  .route("/:id")
  .get(getSingleCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
