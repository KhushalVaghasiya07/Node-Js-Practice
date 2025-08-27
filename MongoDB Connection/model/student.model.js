const mongoose = require('mongoose')

const studentScheme = mongoose.Schema({
  firstname: String,
  lastname: {
      type : String
  },
  email: {
      type : String
  },
  age: {
    type : Number
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },

  contactNo: {
    type : Number
  }
})

const Student = mongoose.model("Students", studentScheme)

module.exports = Student;