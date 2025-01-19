const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const factory = require("../controllers/handlerFactory");
const ApiError = require("../utils/apiError");
const usersModel = require("../models/usersModel");

//@desc Get list of users
//@route GET widestage/v1/users
//@access private
exports.getUsers = factory.getAll(usersModel);

//@desc Get one user
//@route GET   widestage/v1/users/:id
//@access private
exports.getUser = factory.getOne(usersModel);

//@desc  create user
//@route POST /widestage/v1/users
//@access private
exports.createUser = factory.createOne(usersModel);

//@desc  update user
//@route PUT /widestage/v1/users/:id
//@access private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await usersModel.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      roles: req.body.roles,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No user with this Id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  const document = await usersModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No user with this Id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
//@desc  delete user
//@route DELETE /widestage/v1/users/:id
//@access private
exports.deleteUser = factory.deleteOne(usersModel);


//@desc  get logged user data
//@route GET /widestage/v1/users/updateMyPassword
//@access private/protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

//@desc  update logged user password
//@route PUT /widestage/v1/users/updateMyPassword
//@access private/protect
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  //1)update user password based on user payload 
  const user = await usersModel.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });

  res.status(200).json({data: user , token})
});

exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      firstName: req.body.firstName,
      laststName: req.body.lastName,
      email: req.body.email
    },
    { new: true }
  );

  res.status(200).json({ data: updatedUser });
});

// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Protect
exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: 'Success' });
});