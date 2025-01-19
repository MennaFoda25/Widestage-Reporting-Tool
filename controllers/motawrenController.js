const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const factory = require("../controllers/handlerFactory");
const ApiError = require("../utils/apiError");
const motawrenModel = require("../models/motawrenModel");

exports.getAllPoints = factory.getAll(motawrenModel)
// const importJsonData = async (filePath) => {
//     return new Promise((resolve, reject) => {
//         const fullPath = path.resolve(filePath);

//         fs.readFile(fullPath, "utf8", async (err, data) => {
//             if (err) {
//                 return reject("Error reading file: " + err);
//             }

//             try {
//                 const jsonData = JSON.parse(data); // Parse the JSON data

//                 if (!Array.isArray(jsonData)) {
//                     return reject("Parsed JSON is not an array.");
//                 }

//                 // Insert data into the generic collection
//                 const result = await GenericModel.insertMany(jsonData); 
//                 resolve(result);
//             } catch (error) {
//                 reject("Error processing data: " + error);
//             }
//         });
//     });
// };

