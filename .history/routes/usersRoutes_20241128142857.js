const express = require("express");

const { UsersDelete } = require("../controllers/usersController");

const router = express.Router();

router.route("/").delete(UsersDelete);

module.ex
