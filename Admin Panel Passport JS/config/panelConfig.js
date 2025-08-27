const mongoose = require('mongoose');

const dbconnect = () => {
    mongoose.connect('mongodb+srv://khushalvaghasiya0:Khushal123@cluster0.r9k7jxe.mongodb.net/admin_panel')
        .then(() => console.log("Db connection successful"))
        .catch((err) => console.log(err))
}

module.exports = dbconnect;