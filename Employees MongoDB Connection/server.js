const express = require('express')
const eployeeConfing = require("./config/employeeConfig");
const movieRouter = require("./routes/movie.route")

const server = express();

server.use("/uploads", express.static("uploads"))
server.set("view engine", "ejs");
server.use(express.urlencoded());

server.use("/", movieRouter )

server.listen(8000, () => {
  eployeeConfing()
  console.log("Server is Running at http://localhost:8000")
})