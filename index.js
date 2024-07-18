require("dotenv").config();
const userRouter = require("./src/routes/userRouter.js");
const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const connection = require("./src/db.js");

connection();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to Lanka Hardware API...");
});
app.use("/users", userRouter);

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
