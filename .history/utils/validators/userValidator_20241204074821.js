const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Users = require("../../models/usersModel");

exports.createUserValidator = [
  check("firstName").notEmpty().withMessage("name is required"),

  check("lastName").notEmpty().withMessage("name is required"),

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

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      Users.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email is already in use"));
        }
      })
    ),

  check("roles").optional(),

  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

exports.changePasswordValidator = [
  body("currentPassword").notEmpty().withMessage("enter your current password"),
  body("passwordConfirm").notEmpty().withMessage("confirm your password"),

  body('password')
];
exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];
