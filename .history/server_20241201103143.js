const express = require("express");
const path = require("path");
const cluster = require('cluster');
const http = require("http");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const dotenv = require("dotenv");
const RedisStore = require('connect-redis')(session);
const session = require("express-session");
const passport = require("passport");
const multer = require('multer');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require('fs');
const os = require('os');


// Environment Setup
const env = process.env.NODE_ENV || 'production';
global.env = env;

const app = express();

// Middleware Configuration
app.use(cookieParser());
app.use(cookieSession({
    key: "widestage",
    secret: "your-secret-key", // Replace with your own secret
    httpOnly: true,
    secure: false, // Set to true in production for HTTPS
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(session({
    secret: 'your-session-secret', // Replace with your own secret
    cookie: { httpOnly: true, secure: false },
    store: new RedisStore({}),
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: './uploads' }).any());

// Global Variables
global.authentication = true; // Modify based on your requirements
global.logFailLogin = true;
global.logSuccessLogin = true;
const usersRoutes = require("./routes/usersRoutes");
dotenv.config({ path: "config.env" });



 // For parsing application/x-www-form-urlencoded
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
