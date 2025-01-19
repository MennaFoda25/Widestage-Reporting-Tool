// const fs = require("fs");
// require("colors");
// const dotenv = require("dotenv");
// const motawrenModel = require("../../models/motawrenModel");
// const dbConnection = require("../../config/database");
// const path = require("path");

// dotenv.config({ path: "../../config.env" });

// dbConnection();

// //const dataPath = path.join(__dirname, "..", "/Data", "motawren.json");

// //console.log(dataPath);

// const motawrenData = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "..", "/Data", "motawren.json"))
// );
// // const testMotawren = new MotawrenSchema(
// //   JSON.parse(fs.readFileSync(dataPath, "utf-8"))
// // );
// console.log(motawrenData);

// // fs.readFile(dataPath, "utf8", (err, data) => {
// //   if (err) {
// //     console.error("Error reading file:", err);
// //     return;
// //   }
// //   try {
// //     const jsonData = JSON.parse(data);
// //     console.log(jsonData);

// //     motawrenModel.create(jsonData);

// //     //const testMotawren = new MotawrenSchema(jsonData);

// //     if (fs.existsSync(dataPath)) {
// //       console.log("File exists");
// //       process.exit();
// //     } else {
// //       console.error("File does not exist at path:", dataPath);
// //     }

// //     jsonData
// //       .save()
// //       .then(() => {
// //         console.log("Document saved successfully.");
// //       })
// //       .catch((saveError) => {
// //         console.error("Error saving document:", saveError);
// //       });
// //   } catch (parseError) {
// //     console.error("Error parsing JSON:", parseError);
// //   }
// // });
// const insertData = async () => {
//   try {
//     await motawrenModel.create(motawrenData)
//     // await motawrenModel.create(motawrenData);
//     //const testMotawren = new motawrenModel(motawrenData);

//     // testMotawren.save().then(() => {
//     //   console.log("Document saved successfully.");
//     // });
//     console.log("Data Inserted".green.inverse);
//     process.exit();
//   } catch (error) {
//     console.log(error);
//   }
// };
// // Delete data from DB
// const destroyData = async () => {
//   try {
//     await motawrenModel.deleteMany();
//     console.log("Data Destroyed".red.inverse);
//     process.exit();
//   } catch (error) {
//     console.log(error);
//   }
// };

// // node seeder.js -d
// if (process.argv[2] === "-i") {
//   insertData();
// } else if (process.argv[2] === "-d") {
//   destroyData();
// }
