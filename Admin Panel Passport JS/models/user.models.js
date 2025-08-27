const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    contactno: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    hobbies: {
        type: Array
    },
    image: {
        type: String
    },
});

module.exports = mongoose.model("user", userSchema)