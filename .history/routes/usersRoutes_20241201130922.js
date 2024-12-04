const express = require("express");

const { getUser, getUsers, createUser, updateUser, deleteUser } = require("../controllers/usersController");

const router = express.Router();

router.route("/").post(UsersCreate).delete(UsersDelete);

module.exports = router
