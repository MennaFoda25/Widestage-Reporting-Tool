const express = require("express");
const Authorized = require("../controllers/authController");
const {
  createUserValidator,
  updateUserValidator,
  getUserValidator,
  deleteUserValidator,
  changePasswordValidator,
  //updateLoggedUserPasswordValidator,
} = require("../utils/validators/userValidator");
const {
  changePassword,
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/getMe", Authorized.protect, getLoggedUserData, getUser);
router.put(
  "/changeMyPassword",
  Authorized.protect,
  //  updateLoggedUserPasswordValidator,
  updateLoggedUserPassword
);

router.put("/updateMyData", Authorized.protect, updateLoggedUserData);

router.use(Authorized.protect, Authorized.allowedTo("admin"));

router.put("/changePassword/:id", changePasswordValidator, changePassword);

router.route("/").post(createUserValidator, createUser).get(getUsers);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .delete(deleteUserValidator, deleteUser)
  .put(updateUserValidator, updateUser);

module.exports = router;
