const { param, validationResult, check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createUserValidator = [
  check("firstName").notEmpty().withMessage("name is required"),
  check('lastName').notEmpty().withMessage("name is required"),
  validatorMiddleware,
];
