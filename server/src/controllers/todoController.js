import Todo from '../models/todo.js';

// Create a new todo
export const createTodo = async (req, res) => {
    try {
        let { title, completed } = req.body;
        // if title includes wtf replace with ***
        if (title.includes('wtf')) {
            title = title.replace(/wtf/g, '***');
        }
        const newTodo = await Todo.create({ title, completed });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
};

// Get all todos
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
};

// Update a todo
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        const { title, completed } = req.body;
        await todo.update({ title, completed });
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error });
    }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        await todo.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
};