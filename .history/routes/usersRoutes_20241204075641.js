const express = require("express");

const {
  createUserValidator,
  updateUserValidator,
  getUserValidator,
  deleteUserValidator,
  changePasswordValidator
} = require("../utils/validators/userValidator");
const {
  changePassword,
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/").post(createUserValidator, createUser).get(getUsers);

router.put("/changePassword/:id",changePasswordValidatorchangePassword);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .delete(deleteUserValidator, deleteUser)
  .put(updateUserValidator, updateUser);

module.exports = router;
