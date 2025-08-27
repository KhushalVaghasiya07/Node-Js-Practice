const Employee = require("../model/employee.model")
const fs = require("fs")
const path = require("path")


exports.homepage = async (req, res) => {
  let employee = await Employee.find();
  res.render("index", { employee });
}


exports.addEmployee = async (req, res) => {
  let image = req.file ? "/uploads/" + req.file.filename : "";
  console.log("image : ", image)
  await Employee.create({ ...req.body, image });
  console.log("Employee Detail Succesfully Added")
  res.redirect("/");
}

exports.delEmployee = async (req, res) => {

  let id = req.params.id;
  let singleRec = await Employee.findById(id);
  if (singleRec.image) {
    let imagePath = path.join(__dirname, "..", singleRec.image)
    if (imagePath != "") {
      await fs.unlinkSync(imagePath)
    }
  }
  await Employee.findByIdAndDelete(id);
  res.redirect("/")
}

exports.editformview = async (req, res) => {

  let id = req.params.id;
  let employee = await Employee.findById(id);
  res.render("editEmployee", { employee })
}

exports.editEmp = async (req, res) => {

  const id = req.params.id;
  let singleEmp = await Employee.findById(id);
  if (!singleEmp) {
    res.redirect("back")
  }
  else {
    let imagePath = ""
    if (req.file) {
      if (singleEmp != "") {
        imagePath = path.join(__dirname, singleEmp.image)
        await fs.unlinkSync(imagePath)
        imagePath = `/uploads/${req.file.filename}`
      }
      else {
        imagePath = `/uploads/${req.file.filename}`
      }
    }
    else {
      imagePath = singleEmp.image
    }
    await Employee.findByIdAndUpdate(id, { ...req.body, image: imagePath });
    res.redirect("/")

  }
}