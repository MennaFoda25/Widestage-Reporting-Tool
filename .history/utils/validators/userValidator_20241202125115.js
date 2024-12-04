const { param, validationResult } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");


exports.createUserValidator = [
    check('firstName').notEmpty().withMessage('name is required')
    .
]