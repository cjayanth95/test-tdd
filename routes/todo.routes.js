//All routes are defined here
const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller.js");
router.post("/", todoController.createTodo);
router.put("/:todoId", todoController.updateTodoById);
router.get("/", todoController.getTodos);
router.get("/:todoId", todoController.getTodoById);

module.exports = router;
