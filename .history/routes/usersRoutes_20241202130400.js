const express = require("express");

const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/userValidator");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/").post(createUserValidator,createUser).get(getUsers);

router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;
