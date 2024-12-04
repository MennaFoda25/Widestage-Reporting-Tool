const express = require("express");

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/").post(createUser,).get(getUsers);

router.route('/:id').get(getUser)

module.exports = router;
