const mongoose = require('mongoose')

const MongooseConnction = () => {
  mongoose.connect("mongodb://localhost:27017/studentDetails")
    .then(() => console.log("DB connection Successfully"))
    .catch((err) => console.log(err));
}

module.exports = MongooseConnction