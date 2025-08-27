const multer = require("multer");
const path = require("path")


const imgUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/Blogs-Images")
    },
    filename: (req, file, cb) => {
        cb(null, `BLOG-${Date.now()}`)
    }
})

const blogsImg = multer({storage : imgUpload});
module.exports = blogsImg;