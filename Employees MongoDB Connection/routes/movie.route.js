const express = require("express")
const router = express.Router();
const { homepage, addEmployee, delEmployee, editformview, editEmp } = require("../controller/movie.controller");
const uploadImg = require("../middleware/uploadImage");

router.get("/", homepage)
router.post("/add-employee", uploadImg.single("image") , addEmployee)
router.get("/delete-employee/:id" , delEmployee)
router.get("/edit-employee/:id" , editformview)
router.post("/edit-employee/:id", uploadImg.single("image"), editEmp)

module.exports = router