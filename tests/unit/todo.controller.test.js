const todocontroller = require('../../controllers/todo.controller.js');
const TodoModel = require('../../models/todo.model.js')
const httpMocks = require('node-mocks-http')
const TodoData = require('../mock-data/newTodo.json')
const allTodos = require("../mock-data/allTodos.json");

TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();

const todoId = '632bdf5c6fa1756ff9833f32';

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe("todocontroller.updateTodoById", () => {
    it("should have a update todo function", () => {
        expect(typeof todocontroller.updateTodoById).toBe("function");
    })
    it("should update todo function and call model", async () => {
        req.body = TodoData;
        req.params.todoId = todoId;
        await todocontroller.updateTodoById(req, res, next);
        expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, TodoData, {
            new: true,
            useFindAndModify: false
        })
    })
    it("should update the json and return 200", async () => {
        req.params.todoId = todoId;
        req.body = TodoData;
        TodoModel.findByIdAndUpdate.mockReturnValue(TodoData)
        await todocontroller.updateTodoById(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(TodoData);
    })

    it("should handle errors", async () => {
        const errorMessage = {
            message: "error message"
        };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        const result = await todocontroller.updateTodoById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
})

describe("todocontroller.getTodoById", () => {
    it("should have a getTodoById function", () => {
        expect(typeof todocontroller.getTodoById).toBe("function");
    })
    it("should call TodoModel.findById with route parameters", async () => {
        req.params.todoId = '632bdf5c6fa1756ff9833f32';
        await todocontroller.getTodoById(req, res, next);
        expect(TodoModel.findById).toBeCalledWith('632bdf5c6fa1756ff9833f32')
    })

    it("should return json body and response 200", async () => {
        TodoModel.findById.mockReturnValue(TodoData);
        await todocontroller.getTodoById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(TodoData);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should do error handling", async () => {
        const errorMessage = { message: "error in gettodoByid" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.findById.mockReturnValue(rejectedPromise);
        await todocontroller.getTodoById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);

    })
    it("should return 404 for null", async () => {
        TodoModel.findById.mockReturnValue(null);
        await todocontroller.getTodoById(req, res, next);
        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy();
    })
})

describe("todocontroller.getTodo", () => {
    it("should have a get todos fn", () => {
        expect(typeof todocontroller.getTodos).toBe("function");
    })

    it("should call Todomodel.find", async () => {
        await todocontroller.getTodos(req, res, next);
        expect(TodoModel.find).toHaveBeenCalledWith({});
    })

    it("should return status 200 and all todos", async () => {
        TodoModel.find.mockReturnValue(allTodos);
        await todocontroller.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos)
    })
    it("should handle errors in get todos", async () => {
        const errorMessage = { message: "property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.find.mockReturnValue(rejectedPromise);
        await todocontroller.getTodos(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);

    })
})

describe("TodoController.createTodo", () => {
    beforeEach(() => {
        req.body = TodoData;
    })
    it("should have a create todo function", () => {
        expect(typeof todocontroller.createTodo).toBe("function");
    })

    it("should call todo.create", async () => {
        await todocontroller.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(TodoData);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should return json body", async () => {
        TodoModel.create.mockReturnValue(TodoData);
        await todocontroller.createTodo(req, res, next)
        expect(res._getJSONData()).toStrictEqual(TodoData);
    })

    it("should handle errors", async () => {
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodoModel.create.mockReturnValue(rejectedPromise);
        await todocontroller.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })


})
