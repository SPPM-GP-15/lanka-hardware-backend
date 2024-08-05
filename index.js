require("dotenv").config();
const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const productRouter = require("./src/routes/productRouter.js");
const userRouter = require("./src/routes/userRouter.js");
const categoryRouter = require("./src/routes/categoryRouter.js");
const orderRouter = require("./src/routes/orderRouter.js");
const cartRouter = require("./src/routes/cartRouter.js");
const addressRouter = require("./src/routes/addressRouter.js");

const mongoose = require("mongoose");

const connection = require("./src/db.js");

connection();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to Lanka Hardware API...");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
