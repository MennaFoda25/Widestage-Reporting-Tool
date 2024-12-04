const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

const factory = require("../controllers/handlerFactory");
const ApiError = require("../utils/apiError");
const usersModel = require("../models/usersModel");

//@desc Get list of users 
//@route GET 
//@access private

exports.getUsers = factory.getAll(usersModel)

// exports.UsersCreate = async function (req, res, next) {
//   try {
//     req.query.trash = true;
//     req.query.companyid = true;
//     req.body.companyID = "COMPID"; // Assign company ID directly

//     // Handle password generation if requested
//     let thePassword;
//     if (req.body.sendPassword === true) {
//       const generatePassword = require("password-generator");
//       thePassword = generatePassword();
//       req.body.pwd1 = thePassword;
//       req.body.userPassword = thePassword;
//     }

//     // Set default fields for the user
//     req.body.status = "active";
//     req.body.nd_trash_deleted = false;

//     // Create user data object for insertion
//     const data = req.body;

//     // Set createdBy and createdOn based on authenticated user
//     if (req.query.userid) {
//       data.createdBy = req.isAuthenticated() ? req.user._id : null;
//       data.createdOn = new Date();
//     }

//     // Set companyID from authenticated user
//     if (req.query.companyid) {
//       data.companyID = req.isAuthenticated() ? req.user.companyID : null;
//     }

//     // Handle trash condition
//     if (req.query.trash) {
//       data.nd_trash_deleted = false;
//     }

//     // User tracking information
//     const user = req.isAuthenticated() ? req.user.username : "unsigned user";
//     if (!data.nd_history) {
//       data.nd_history = [];
//     }

//     // Add creation details to nd_history
//     data.nd_history.push({
//       text: `Created on ${new Date()} by ${user}`,
//       user_id: req.isAuthenticated() ? req.user._id : null,
//       user_name: req.isAuthenticated() ? req.user.username : null,
//       user_companyID: req.isAuthenticated() ? req.user.companyID : null,
//       user_companyName: req.isAuthenticated() ? req.user.companyName : null,
//     });

//     // Create the user using the model
//     const Users = connection.model("Users");
//     const result = await Users.create(data);

//     // Handle sending password email if required
//     if (req.body.sendPassword === true && thePassword) {
//       const recipients = [];
//       recipients.push(req.body);
//       sendEmailTemplate(
//         "newUserAndPassword",
//         recipients,
//         "email",
//         "welcome to widestage"
//       );
//     }

//     // Successfully respond with created item
//     return serverResponse(req, res, 200, {
//       result: 1,
//       msg: "Item created",
//       item: result.toObject(),
//     });
//   } catch (err) {
//     // Pass errors to the next middleware
//     return next(new ApiError(err.message, 500));
//   }
// };

// exports.UsersDelete = function (req, res) {
//   req.query.trash = true;

//   controller.delete(req, function (result) {
//     serverResponse(req, res, 200, result);
//   });
// };
