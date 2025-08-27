const mongoose = require("mongoose");

const eployeeConfing = () => {
  mongoose.connect("mongodb://localhost:27017/employeeDetails")
    .then(() => console.log("Database Succesfully"))
  .catch((err) => console.log(err))
}

module.exports = eployeeConfing