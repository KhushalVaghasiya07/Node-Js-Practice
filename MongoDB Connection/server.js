const express = require('express');
const MongooseConnction = require('./config/mongooseConfig')
const Student = require("./model/student.model")

const server = express();

server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));


server.get("/", async (req, res) => {
  let students = await Student.find()
  res.render("index", { students });
})

server.post("/add-student", async (req, res) => {
  await Student.create(req.body);
  console.log("Create Success");
  res.redirect("/")
})

server.get("/remove-student/:id", async (req, res) => {
  let id = req.params.id;
  let removeStu = await Student.findByIdAndDelete(id)
  res.redirect("/")
})

server.get("/edit-student/:id", async (req, res) => {
  let id = req.params.id;
  let student = await Student.findById(id)
  res.render("editStudent", { student })
})

server.post("/edit-student/:id", async (req, res) => {
  let id = req.params.id;
  let student = await Student.findByIdAndUpdate(id, req.body)
  res.redirect("/")
})

server.listen(8000, () => {
  MongooseConnction()
  console.log("Server is Starting http://localhost:8000");
})