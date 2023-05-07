const router = require("express").Router();
const userController = require("../controllers/user.controller");
const checkPermission = require("../middlewares/check-permission.middleware");
const isAuthenticated = require("../middlewares/is-authenticated.middleware");

router.post("/", userController.createUser);
router.get("/:userId", userController.findUserById);
router.get(
  "/",
  isAuthenticated,
  checkPermission("PERMISSION_LIST_USERS"),
  userController.findAllUsers
);
router.put("/update-password", isAuthenticated, userController.updatePassword);
router.put("/:userId", userController.editUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
