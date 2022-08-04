const express = require("express");
const { route } = require("express/lib/application");

const router = express.Router({ mergeParams: true });

const {
  getReviews,
  getSingleReview,
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");

const Reviews = require("../models/Review");
const advancedResult = require("../middleware/advancedResult");

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResult(Reviews, {
      path: "bootcamp",
      select: "name description",
    }),
    getReviews
  )
  .post(protect, authorize("publisher", "admin"), addReview);

router
  .route("/:id")
  .get(getSingleReview)
  .put(protect, authorize("publisher", "admin"), updateReview)
  .delete(protect, authorize("publisher", "admin"), deleteReview);

module.exports = router;
