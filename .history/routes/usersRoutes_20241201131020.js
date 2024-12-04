const express = require("express");

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/").post(c).delete(UsersDelete);

module.exports = router;
