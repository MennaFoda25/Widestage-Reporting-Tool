const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Users = require('../../models/usersModel')

exports.createUserValidator = [
  check("firstName").notEmpty().withMessage("name is required"),
  check("lastName").notEmpty().withMessage("name is required"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 3 })
    .withMessage("Too short"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address").custom((val)=>Users.findOne({email: val}).then(user)=>{
        
    }),

  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];
