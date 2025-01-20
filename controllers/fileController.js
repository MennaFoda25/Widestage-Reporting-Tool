const multer = require("multer");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //save files in the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //append timestamp to filename
  },
});

const upload = multer({ storage });
// Define a flexible schema using Mongoose
const flexibleSchema = new mongoose.Schema({}, { strict: false });

const FlexibleModel = mongoose.model("FlexibleData", flexibleSchema);

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const filePath = req.file.path;
  // Process the file (e.g., read CSV/JSON and generate a report)
  // Add your file processing logic here

  try {
    //process file based on its type

    if (filePath.endsWith(".csv")) {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          await FlexibleModel.insertMany(results);
          res.status(200).json({
            message: "File uploaded and data saved to database",
            data: results,
          });
        });
    } else if (filePath.endsWith(".json")) {
      const fileData = fs.readFileSync(filePath, "utf8");
      const jsonData = JSON.parse(fileData);
      // Save data to the database
      await FlexibleModel.insertMany(jsonData);
      res.status(200).json({
        message: "File uploaded and data saved to database",
        data: jsonData,
      });
    } else {
      res.status(400).json({ message: "Unsupported file format" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error processing file or saving to database",
      error: error.message,
    });
  }
};
module.exports = { upload, uploadFile };
