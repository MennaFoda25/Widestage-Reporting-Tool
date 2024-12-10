const express = require("express");
const Authorized = require("../controllers/authController");
const {
  createUserValidator,
  updateUserValidator,
  getUserValidator,
  deleteUserValidator,
  changePasswordValidator,
} = require("../utils/validators/userValidator");
const {
  changePassword,
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

const router = express.Router();

router
  .route("/")
  .post(
    Authorized.protect,
    Authorized.allowedTo("admin"),
    createUserValidator,
    createUser
  )
  .get(Authorized.protect, Authorized.allowedTo("admin"), getUsers);

router.put("/changePassword/:id", changePasswordValidator, changePassword);

router
  .route("/:id")
  .get(
    Authorized.protect,
    Authorized.allowedTo("admin"),
    getUserValidator,
    getUser
  )
  .delete(
    Authorized.protect,
    Authorized.allowedTo("admin"),
    deleteUserValidator,
    deleteUser
  )
  .put(
    Authorized.protect,
    Authorized.allowedTo("admin"),
    updateUserValidator,
    updateUser
  );

module.exports = router;
