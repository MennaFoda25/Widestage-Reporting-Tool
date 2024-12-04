const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(`Database is connected : ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`Database Error:${err}`);
      process.exit(1);
    });
};

module.exports