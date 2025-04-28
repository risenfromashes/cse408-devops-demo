import request from 'supertest';
import app from '../app.js';
import Todo from '../models/todo.js';
import sequelize from '../config/database.js'; // Import sequelize directly

describe('Todo API', () => {
  beforeAll(async () => {
    // Setup test database connection and sync models
    await Todo.sync({ force: true });
  });

  afterAll(async () => {
    // Close database connection
    if (sequelize) {
      await sequelize.close(); // Use the imported sequelize instance directly
    }
  });

  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({ title: 'Test Todo', completed: false, dueDate: new Date() });

    expect(response.status).toBe(202);
    expect(response.body.title).toBe('Test Todo');
  });

  it('should fetch all todos', async () => {
    const response = await request(app).get('/api/todos');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should delete a todo', async () => {
    const todo = await Todo.create({ title: 'Todo to delete', completed: false, dueDate: new Date() });

    const response = await request(app).delete(`/api/todos/${todo.id}`);

    expect(response.status).toBe(204);
  });
});