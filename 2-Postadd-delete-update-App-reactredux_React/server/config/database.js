const mongoose = require("mongoose");

const database = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("mongodb is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = database;
