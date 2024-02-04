const express = require("express");
const router = express.Router();
const controller_reviews = require("../controllers/controller_reviews");

router
  .route("/:id")
  .post(controller_reviews.post)
  .put(controller_reviews.updateLike)
  .delete(controller_reviews.deleteReview);

module.exports = router;
