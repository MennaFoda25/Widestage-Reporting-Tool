const express = require("express");
const {
  connectToDatabase,
  queryCollection,
  extractSchema,
} = require("../config/mongodb");
const router = express.Router();

// Database connection route
router.post("/connect", connectToDatabase);

// Query collection route
router.post("/query", queryCollection);

// Extract schema route
router.post("/schema", extractSchema);
module.exports = router;
