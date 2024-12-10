const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Users = require("../../models/usersModel");
const bcrypt = require('bcryptjs');


exports.signupValidator = [
  check("firstName").notEmpty().withMessage("name is required"),

  check("lastName").notEmpty().withMessage("name is required"),

  check("email")
    .notEmpty()
    .withMessage("Please enter your email")
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom((val) => 
      Users.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email already in use"));
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3 })
    .withMessage("Too short")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Password Confirmation is incorrect");
      }
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("password confirmation needed"),

  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Please enter your email")
    .isEmail()
    .withMessage("Invalid Email Format"),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3 })
    .withMessage("Too short"),

  validatorMiddleware,
];
