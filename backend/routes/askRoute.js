const express = require("express");
const askController = require("../controllers/askController");
const authController = require("../controllers/authController");
const answerRouter = require("./answerRoute");

const router = express.Router();

router.use("/:askId/answers", answerRouter);

router
  .route("/")
  .post(authController.protect, askController.askQuestion)
  .get(authController.protect, askController.showAllQuestions);

router
  .route("/:id")
  .get(authController.protect, askController.getQuestion)
  .delete(authController.protect, askController.deleteQuestion)
  .patch(authController.protect, askController.updateQuestion);

module.exports = router;
