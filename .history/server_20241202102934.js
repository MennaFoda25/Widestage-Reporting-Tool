const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan"); //middleware to log req
const ApiError = require("./utils/apiError");
const path = require("path");
const cluster = require("cluster");
const http = require("http");
const cookieParser = require("cookie-parser");
//const cookieSession = require("cookie-session");
//const RedisStore = require("connect-redis")(session);
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
const os = require("os");
dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const usersRoutes = require("./routes/usersRoutes");

dbConnection();

const app = express();
// // Environment Setup\

// const env = process.env.NODE_ENV || 'production';
// global.env = env;

// const app = express();

// // Middleware Configuration
// app.use(cookieParser());
// app.use(cookieSession({
//     key: "widestage",
//     secret: "your-secret-key", // Replace with your own secret
//     httpOnly: true,
//     secure: false, // Set to true in production for HTTPS
//     cookie: { maxAge: 60 * 60 * 1000 }
// }));

// app.use(session({
//     secret: 'your-session-secret', // Replace with your own secret
//     cookie: { httpOnly: true, secure: false },
//     store: new RedisStore({}),
//     resave: false,
//     saveUninitialized: true
// }));

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer({ dest: './uploads' }).any());

// // Global Variables
// global.authentication = true;
// global.logFailLogin = true;
// global.logSuccessLogin = true;

// // Passport Authentication Middleware
// if (global.authentication) {
//   app.use(passport.initialize());
//   app.use(passport.session());
// }

// // Clustering
// if (cluster.isMaster) {
//   const numCPUs = os.cpus().length;

//   for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//       console.log(`Worker ${worker.process.pid} died. Starting a new worker.`);
//       cluster.fork();
//   });
// } else {
//   dotenv.config({ path: "config.env" });
//  // const config = require('./')[env];
//   global.config = config;

//   // Load configurations
//   require('./server/config/mongoose')();
//   require('./server/config/passport')(passport);
//   require('./server/globals');
//   require('./server/config/mailer');
//   require('./server/config/routes')(app, passport);

//  // Dynamically load custom routes
// //  const routesDir = path.join(__dirname, 'server/custom');
// //  fs.readdirSync(routesDir).forEach(file => {
// //      if (file[0] !== '.') {
// //          require(path.join(routesDir, file, 'routes.js'))(app);
// //      }
// //  });

//  const ipaddr = process.env.IP || config.ip;
//  const port = process.env.PORT || config.port;

//  app.listen(port, ipaddr, () => {
//      console.log(`Server running at http://${ipaddr}:${port}/ in worker ${cluster.worker.id}`);
//  });
// }

// const usersRoutes = require("./routes/usersRoutes");

// app.use(morgan());
// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/api/admin/users", usersRoutes);
// app.get("/", (req, res) => {
//   res.send("Widestage");
// });

//Middlewares

//
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount Routes
app.use("/widestage/v1/users", usersRoutes);

app.all("*", (req, res, next) => {
  //create error and send it to error handling middleware
  // const err = new Error(`Can't find this route: ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 4));
});
//Global error handling middleware
app.use((err, req, res, next) => {
  res.status(400).json({ err });
});

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Widestage is running on Port ${PORT}`);
});
