const express = require("express");

const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);

module.exports = router;
