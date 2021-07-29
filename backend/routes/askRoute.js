const express = require("express");
const askController = require("../controllers/askController");
const authController = require("../controllers/authController");
const answerRouter = require("./answerRoute");

const router = express.Router();
const nestedRouter = express.Router({ mergeParams: true });

router.use("/:askId/answers", answerRouter);
router.use("/:like/likes", nestedRouter);

router
  .route("/")
  .post(authController.protect, askController.askQuestion)
  .get(askController.showAllQuestions);

router
  .route("/:id")
  .get(askController.getQuestion)
  .delete(authController.protect, askController.deleteQuestion)
  .patch(authController.protect, askController.updateQuestion);

nestedRouter.patch("/", authController.protect, askController.addLike);

module.exports = router;
