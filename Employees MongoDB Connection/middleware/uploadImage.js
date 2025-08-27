const multer = require("multer")
const path = require("path")

const uploadImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },

  filename: (req, file, cb) => {
    cb(null, `IMG-${Math.trunc(Math.random()*1000000000000)}`)
  }
});

const uploadImg = multer({ storage : uploadImage })

module.exports = uploadImg;