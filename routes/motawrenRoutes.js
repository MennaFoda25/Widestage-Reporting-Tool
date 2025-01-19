// // routes/yourRoutes.js
 const express = require('express');
 const {getAllPoints} = require('../controllers/motawrenController');
 const router = express.Router();

 router.route("/").get(getAllPoints);

 module.exports = router;