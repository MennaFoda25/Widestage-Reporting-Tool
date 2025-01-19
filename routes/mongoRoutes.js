const express = require("express");
const { getAll } = require("../controllers/mongoController");
const { Model } = require("mongoose");

const router = express.Router();

router.get("/", getAll);

module.exports = router;
