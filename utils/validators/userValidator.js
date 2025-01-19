const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Users = require("../../models/usersModel");
const bcrypt = require("bcryptjs");

exports.createUserValidator = [
  check("firstName").notEmpty().withMessage("name is required"),

  check("lastName").notEmpty().withMessage("name is required"),

  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      Users.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in user"));
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

  check("roles").optional(),

  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom((val) => {
      Users.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email already in use"));
        }
      });
    }),
    check('roles').optional(),
  validatorMiddleware,
];

exports.changePasswordValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),

  body("currentPassword").notEmpty().withMessage("enter your current password"),

  body("passwordConfirm").notEmpty().withMessage("confirm your password"),

  body("password")
    .notEmpty()
    .withMessage("ENter new password")
    .custom(async (val, { req }) => {
      const user = await Users.findById(req.params.id);
      if (!user) {
        throw new Error("there is no user for this id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Password does not match");
      }
      if (val !== req.body.passwordConfirm) {
        throw new Error("Password CTonfirmation is incorrect ");
      }
      return true;
    }),

  validatorMiddleware,
];

// exports.updateLoggedUserPasswordValidator = [
//   check("token").custom(async (val, { req }) => {

//   }),
//   body("currentPassword").notEmpty().withMessage("enter your current password"),

//   body("passwordConfirm").notEmpty().withMessage("confirm your password"),

//   body("password")
//     .notEmpty()
//     .withMessage("ENter new password")
//     .custom(async (val, { req }) => {
//       const isCorrectPassword = await bcrypt.compare(
//         req.body.currentPassword,
//         user.password
//       );
//       if (!isCorrectPassword) {
//         throw new Error("Password does not match");
//       }
//       if (val !== req.body.passwordConfirm) {
//         throw new Error("Password CTonfirmation is incorrect ");
//       }
//       return true;
//     }),

//   validatorMiddleware,
// ];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware,
];
