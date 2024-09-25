const Todo = require('../models/Todo'); // Ensure the path is correct

// Create a new todo
const createTodo = async (req, res) => {
    const { title, status } = req.body;
    const newTodo = new Todo({ title, status, userId: req.user.id });
    await newTodo.save();
    res.status(201).json(newTodo);
};

// Get all todos for the authenticated user
const getTodos = async (req, res) => {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
};

// Update a todo
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, status }, { new: true });
    res.status(200).json(updatedTodo);
};

// Delete a todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
