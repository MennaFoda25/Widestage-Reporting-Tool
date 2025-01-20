const express = require("express");
const router = express.Router();
const { upload, uploadFile } = require("../controllers/fileController");

//file upload route
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
