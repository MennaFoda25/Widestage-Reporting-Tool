const mongoose = require("mongoose");
const bcrypt = require("bycrypt.js");
//const hash = require("../utils/hash");

const usersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "last name is required"],
    },
    userName: String,
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [3, "Password is too short"],
    },
    companyID: String,
    status: String,
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    language: String,
    salt: String,
    hash: String,
    hash_verify_account: String,
    hash_change_password: String,
    change_password: Boolean,
    roles: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    filters: [String],
    contextHelp: [String],
    dialogs: [String],
    accessToken: String,
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    history: String,
    title: String,
    companyName: String,
    department: String,
    businessUnit: String,
    brand: String,
    unit: String,
    customFilter1: String,
    customFilter2: String,
    customFilter3: String,
    customFilter4: String,
    customFilter5: String,
    customFilter6: String,
    customFilter7: String,
    customFilter8: String,
    customFilter9: String,
    customFilter10: String,
    // facebook: {
    //   id: String,
    //   email: String,
    //   name: String,
    // },
    // twitter: {
    //   id: String,
    //   name: String,
    // },
    // google: {
    //   email: String,
    //   name: String,
    // },
    lastLogin: {
      date: { type: Date },
      ip: { type: String },
    },
    privateSpace: [String],
    defaultDocument: String,
    defaultDocumentType: String,
    ndTrashDeleted: { type: Boolean },
    ndTrashDeletedDate: { type: Date },
    createdBy: String,
    createdOn: { type: Date },
    companyData: {},
  },
  { collection: "wst_Users" }
);

usersSchema.pre("save", async function (next) {
if(!this.isModified())

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Export the User model
const Users = mongoose.model("Users", usersSchema);
module.exports = Users;

// Transform Method
usersSchema.options.toObject = {
  transform: function (doc, user, options) {
    delete user.salt;
    delete user.hash;
    delete user.hash_verify_account;
    delete user.hash_change_password;
  },
};

// // Static Methods
// //Create new user
// usersSchema.statics.createUser = async function (req, done) {
//   const userData = req.body;
//   this.createTheUser(req, userData, done);
// };

// usersSchema.statics.createTheUser = async function (req, userData, done) {
//   const User = this;

//   if (!userData.userName) {
//     return done({ result: 0, msg: "'Username' is required." });
//   }

//   try {
//     const existingUser = await User.findOne({
//       userName: userData.userName,
//       companyID: req.user.companyID,
//     });
//     if (existingUser) {
//       return done({ result: 0, msg: "Username already in use." });
//     }

//     if (userData.pwd1) {
//       const { salt, hash } = await new Promise((resolve, reject) => {
//         hash(userData.pwd1, (err, salt, hash) => {
//           if (err) reject(err);
//           else resolve({ salt, hash });
//         });
//       });

//       userData.password = undefined;
//       userData.salt = salt;
//       userData.hash = hash;
//       userData.companyID = req.user.companyID;

//       const newUser = await User.create(userData);
//       return done({ result: 1, msg: "User created.", user: newUser });
//     } else {
//       return done({ result: 0, msg: "'No Password set for the new user." });
//     }
//   } catch (err) {
//     return done({ result: 0, msg: err.message });
//   }
// };

// usersSchema.statics.setViewedContextHelp = async function (req, done) {
//   const userID = req.user._id;
//   console.log("The user context name", userID, req.query.contextHelpName, req);

//   try {
//     const findUser = await this.findOne({ _id: userID });
//     if (!findUser) {
//       return done({
//         result: 0,
//         msg: "No user found, can't update the user context help",
//       });
//     }

//     const contextHelpName = req.query.contextHelpName;
//     findUser.contextHelp = findUser.contextHelp || [];

//     if (!findUser.contextHelp.includes(contextHelpName)) {
//       findUser.contextHelp.push(contextHelpName);
//     }

//     await Users.updateOne(
//       { _id: userID },
//       { $set: { contextHelp: findUser.contextHelp } }
//     );
//     done({
//       result: 1,
//       msg: "Context Help dialogs updated.",
//       items: findUser.contextHelp,
//     });
//   } catch (err) {
//     done({ result: 0, msg: err.message });
//   }
// };

// usersSchema.statics.setStatus = async function (req, done) {
//   if (!req.session.isWSTADMIN) return;

//   const userID = req.body.userID;
//   const userStatus = req.body.status;

//   if (!userID) {
//     return done({ result: 0, msg: "'id' and 'status' are required." });
//   }

//   try {
//     const findUser = await this.findOne({
//       _id: userID,
//       companyID: req.user.companyID,
//     });
//     if (!findUser) {
//       return done({
//         result: 0,
//         msg: "No user found for this company, can't update the user status",
//       });
//     }

//     await Users.updateOne({ _id: userID }, { $set: { status: userStatus } });
//     done({ result: 1, msg: "Status updated." });
//   } catch (err) {
//     done({ result: 0, msg: err.message });
//   }
// };

// // Validate User Password
// usersSchema.statics.isValidUserPassword = async function (
//   username,
//   password,
//   done
// ) {
//   try {
//     const user = await this.findOne({
//       $or: [{ userName: username }, { email: username }],
//       status: "active",
//     });
//     if (!user)
//       return done(null, false, {
//         message: `User ${username} does not exist or is inactive`,
//       });
//     if (user.status === 0)
//       return done(null, false, { message: `User not verified ${username}` });

//     const hashResult = await new Promise((resolve, reject) => {
//       hash(password, user.salt, (err, hash) => {
//         if (err) reject(err);
//         else resolve(hash);
//       });
//     });

//     if (hashResult === user.hash || password === user.hash + user.salt) {
//       return done(null, user);
//     } else {
//       done(null, false, { message: "Password does not match" });
//     }
//   } catch (err) {
//     done(err);
//   }
// };

// // Remember Password
// usersSchema.statics.rememberPassword = async function (email, url, done) {
//   const crypto = require("crypto");
//   const hash_change_password = crypto
//     .createHash("md5")
//     .update(email)
//     .digest("hex");

//   const postData = {
//     id: "52d66ea2c6b91ae01f00000a",
//     email: email,
//     tags: JSON.stringify({
//       CHANGEPWDURL: `${url}login/#/change-password/${hash_change_password}`,
//     }),
//   };

//   try {
//     await this.updateOne(
//       { email: email },
//       { $set: { hash_change_password: hash_change_password } }
//     );
//     sendCommunication(postData);
//     done({ result: 1, msg: "Check your email for instructions" });
//   } catch (err) {
//     done({ result: 0, msg: err.message });
//   }
// };

// // Change Password
// usersSchema.statics.changePassword = async function (req, done) {
//   const data = req.body;
//   if (!data.hash || !data.password) {
//     return done({ result: 0, msg: "'hash' and 'password' are required." });
//   }

//   try {
//     const user = await this.findOne({ hash_change_password: data.hash });
//     if (!user) {
//       return done({ result: 0, msg: "Invalid hash." });
//     }

//     const { salt, hash } = await new Promise((resolve, reject) => {
//       hash(data.password, (err, salt, hash) => {
//         if (err) reject(err);
//         else resolve({ salt, hash });
//       });
//     });

//     await User.updateOne(
//       { _id: user._id },
//       { $set: { salt: salt, hash: hash, hash_change_password: null } }
//     );

//     const Configurations = connection.model("Configurations");
//     const configuration = await Configurations.getConfiguration(
//       "log-user-pwd-change"
//     );

//     if (configuration.value === 1) {
//       saveToLog(
//         req,
//         `User password changed: ${user.email}`,
//         100,
//         "USERS-001",
//         "",
//         undefined
//       );
//     }

//     done({ result: 1, msg: "Password updated" });
//   } catch (err) {
//     done({ result: 0, msg: err.message });
//   }
// };

// // Find or Create Google User
// usersSchema.statics.findOrCreateGoogleUser = async function (profile, done) {
//   const User = this;

//   try {
//     let user = await this.findOne({ "google.email": profile.emails[0].value });

//     if (user) {
//       return done(null, user);
//     }

//     user = await User.create({
//       status: 1,
//       username: profile.emails[0].value,
//       companyID: "COMPID",
//       email: profile.emails[0].value,
//       google: {
//         email: profile.emails[0].value,
//         name: profile.displayName,
//       },
//     });

//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// };
