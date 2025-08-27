const express = require("express");

const server = express();
server.set("view engine", "ejs");
server.use(express.urlencoded())

let students = [
  {
    id: 101,
    name: "khushal",
    email: "khushal@test.in",
    MobileNo : 9023202745
  },
  {
    id: 102,
    name: "vishal",
    email: "vishal@test.in",
    MobileNo : 9535846581
  },
  {
    id: 103,
    name: "vishal",
    email: "vishal@test.in",
    MobileNo : 9034876526
  }
]



server.get("/", (req, res) => {
  res.render("index" , { students });
})

server.get("/add_student", (req, res) => {
  res.render("add_student")
})

server.post("/add_student", (req, res) => {
  let newstudent = req.body;
  newstudent.id = students.length + 101;
  students.push(newstudent)
  res.redirect("/") 
})

server.get("/delete-data/:id", (req, res) => {
  let id = req.params.id;
  let stu = students.filter(stu => stu.id != id);
  students = stu;
  res.redirect("/");
})

server.get("/edit-data/:id", (req, res) => {
   id = req.params.id;
  let stu = students.find(stu => stu.id == id)
  console.log(stu);
  res.render("edit_student" , {stu , id})
})


server.post("/edit-data/:id", (req, res) => {
  let id = req.params.id;
  let recordStudent = students.findIndex(stu => stu.id == id);
  students[recordStudent] = { ...students[recordStudent], ...req.body }
  res.redirect("/")
} )



server.listen(8000, () => {
  console.log("http://localhost:8000");
})