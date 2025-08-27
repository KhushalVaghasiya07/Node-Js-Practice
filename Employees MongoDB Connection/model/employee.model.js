const mongoose = require("mongoose")

const EmployeeSchema = mongoose.Schema({
  empfirstName: String,
  emplastName: {
    type : String
  },
  email:  {
    type : String
  },
  cityName:  {
    type : String
  },
  contactNum:  {
    type : Number
  },
  image:  {
    type : String
  },
})

const Employee = mongoose.model("Employee" , EmployeeSchema)

module.exports = Employee