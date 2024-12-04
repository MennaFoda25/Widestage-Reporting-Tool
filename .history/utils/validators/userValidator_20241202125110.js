const { param, validationResult } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");


exports.createUserValidator = [
    check('firstname').notEmpty().withMessage('name is required')
    .
]