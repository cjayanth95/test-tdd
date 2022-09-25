const TodoModel = require("../models/todo.model.js");
exports.createTodo = async (req, res, next) => {
  try {
    const createdTodo = await TodoModel.create(req.body);
    res.status(201).json(createdTodo);
  } catch (err) {
    next(err);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
  } catch (err) {
    next(err);
  }
};
exports.getTodoById = async (req, res, next) => {
  try {
    const id = req.params.todoId;
    const model = await TodoModel.findById(id);
    if (model) {
      res.status(200).json(model);
    } else res.status(404).send();
  } catch (err) {
    next(err);
  }
};

exports.updateTodoById = async (req, res, next) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.todoId,
      req.body,
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (updatedTodo) res.status(200).json(updatedTodo);
    else res.status(404).send();
  } catch (e) {
    next(e);
  }
};
