// const fs = require("fs");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const path = require("path");
// const MotawrenModel = require("../models/motawrenModel");
// const dbConnection = require("../config/database");

// dotenv.config({ path: "./config.env" });

// //const DB = process.env.DB_URI;
// //connect to the database
// mongoose
//   .connect(process.env.DB_URI)
//   .then(() => console.log(`Database is connected `));

// // read file and convert string to object
// const motawren = JSON.parse(
//   fs.readFileSync(`${__dirname}/motawren.json`, "utf-8",(err,data)=>{
//     if (err) {
//         console.error("Error reading the file:", err);
//         return;
//       }
      
//     //   const motawren = JSON.parse(data);
//     //   console.log(motawren);
    
//   })
// );

// // Import data to database
// const importData = async () => {
//   try {
//     await MotawrenModel.create(motawren);
//     console.log("Data created successfully");

//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// const deleteData = async () => {
//   try {
//     await Motawren.deleteMany();
//     console.log("Data deleted successfully");
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// if (process.argv[2] == "--import") {
//   importData();
// }
// if (process.argv[2] == "--delete") {
//   deleteData();
// }
