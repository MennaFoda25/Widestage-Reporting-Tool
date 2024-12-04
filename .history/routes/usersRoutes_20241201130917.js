const express = require("express");

const { getUser, getUsers, createUser, } = require("../controllers/usersController");

const router = express.Router();

router.route("/").post(UsersCreate).delete(UsersDelete);

module.exports = router
