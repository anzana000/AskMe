const express = require("express");
const askController = require("../controllers/askController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(askController.askQuestion)
  .get(authController.protect, askController.showAllQuestions);

router
  .route("/:id")
  .get(askController.getQuestion)
  .delete(askController.deleteQuestion)
  .patch(askController.updateQuestion);

module.exports = router;
