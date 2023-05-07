const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.post("/forget-password", authController.forgetPassword);
router.post("/check-token", authController.checkToken);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
