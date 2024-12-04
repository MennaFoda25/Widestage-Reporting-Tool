const express = require("express");
const path = require("path");
const http = require
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/usersRoutes");
dotenv.config({ path: "config.env" });
const app = express();

app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(morgan());
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/admin/users", usersRoutes);
app.get("/", (req, res) => {
  res.send("Widestage");
});

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Widestage is running on Port ${PORT}`);
});
