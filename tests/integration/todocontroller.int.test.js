const request = require('supertest')
const app = require('../../app.js');
const endpointUrl = '/todos/';
const newTodo = require('../mock-data/newTodo.json') 

describe(endpointUrl, () => {
  let firstTodo;
  test("get /todos", async () => {
    const response = await request(app)
      .get(endpointUrl)
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
    firstTodo = response.body[0];
    
  });
  it("get /todo/:id", async () => {
    const response = await request(app)
      .get(endpointUrl + firstTodo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  })
  test("getTodobyid doesn't exist" + endpointUrl + ":todoId", async () => {
    const response = await request(app).get(endpointUrl + "632bdf5c6fa1756ff9833f34");
    expect(response.statusCode).toBe(404);
  })
  it("POST /todos", async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
  it("shoud return 500 on malformed data with POST " + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send({title:"missing done"});
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({message: "Todo validation failed: done: Path `done` is required."})
  });
});
