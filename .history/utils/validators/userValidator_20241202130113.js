const { param, validationResult, check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createUserValidator = [
  check("firstName").notEmpty().withMessage("name is required"),
  check("lastName").notEmpty().withMessage("name is required"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3 })
    .withMessage("Too short"),
    check("email").notEmpty().withMessage("email is required"),

  validatorMiddleware,
];

exports.updateUserValidator =[
    check('')
]
