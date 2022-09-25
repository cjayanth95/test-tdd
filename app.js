const express = require("express");
const mongodb = require("./mongodb/mongodb.connect.js");
const app = express();
const todoRoutes = require("./routes/todo.routes.js");
mongodb.connect();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello world!");
});

app.use("/todos", todoRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = app;
