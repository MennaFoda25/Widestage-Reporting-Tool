const express = require("express");
const 

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

router.route("/").post(createUser).get(getUsers);

router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;
