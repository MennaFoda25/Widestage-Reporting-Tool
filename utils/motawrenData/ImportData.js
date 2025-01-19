const fs = require("fs");
require("colors");
const dotenv = require("dotenv");
const Data = require("../../models/motawrenModel");
const dbConnection = require("../../config/database");
const path = require("path");
dotenv.config({ path: "../../config.env" });
// connect to DB
dbConnection();
console.log("Current directory:", __dirname);
// Read data
//const motawrenPath = path.join("./motawrenData/data.json"); // Build path
const motawren = JSON.parse(fs.readFileSync("./data.json"));
console.log("Trying to read from:", motawren); // Log the full path of the file-

const insertData = async () => {
  try {
    await Data.create(motawren);
    console.log("Data Inserted".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);}
};
// Delete data from DB
const destroyData = async () => {
  try {
    await Data.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
