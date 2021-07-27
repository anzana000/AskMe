const express = require("express");

const answerController = require("../controllers/answerController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(answerController.getAllAnswers)
  .post(answerController.setTourUserIds, answerController.createAnswer);

module.exports = router;
