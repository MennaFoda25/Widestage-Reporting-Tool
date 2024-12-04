const express = require("express");

const { , UsersDelete } = require("../controllers/usersController");

const router = express.Router();

router.route("/").post(UsersCreate).delete(UsersDelete);

module.exports = router
