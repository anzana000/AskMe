const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();
router.post("/forgotPassword", authController.forgotPassword);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.get("/getMe", userController.getMe, userController.getUser);
router.patch("/updateMyPassword", authController.updatePassword);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(authController.restrictTo("admin"), userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(authController.restrictTo("admin"), userController.updateUser)
  .delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;
