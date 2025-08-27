const express = require("express");
const router = require("./routers/index.route");
const panelConfig = require("./config/panelConfig");
const cookieParser = require("cookie-parser")
const path = require("path");
const port = 8000;

const server = express();

server.set("view engine", "ejs");
server.use(express.urlencoded());
server.use(express.static("public"));
server.use(cookieParser());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.use("/", router)

server.listen(port, () => {
    panelConfig();
    console.log(`server is running on http://localhost:${port}`);
});