const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const usersModel = require("../models/usersModel");
const controller = require("../controllers/handlerFactory");

exports.UsersDelete = function (req, res) {
  req.query.trash = true;

  controller.delete(req, function (result) {
    serverResponse(req, res, 200, result);
  });
};
