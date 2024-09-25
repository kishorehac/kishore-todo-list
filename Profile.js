// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, getTodos, createTodo, deleteTodo, updateTodo } from '../services/api';
import TodoForm from '../components/TodoFormold';
import TodoList from '../components/TodoList';

const Profile = () => {
  const [user, setUser] = useState({});
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      fetchProfile(token);
      fetchTodos(token);
    }
  }, [navigate]);

  const fetchProfile = async (token) => {
    try {
      const { data } = await getProfile(token);
      setUser(data); // Set user data
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const fetchTodos = async (token) => {
    try {
      const { data } = await getTodos(token);
      setTodos(data); // Set todos
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  const handleAddTodo = async (newTodo) => {
    const token = localStorage.getItem('token');
    try {
      await createTodo(token, newTodo);
      fetchTodos(token); // Refresh todo list
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteTodo(token, id);
      fetchTodos(token); // Refresh todo list
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  const handleUpdateTodo = async (id) => {
    const token = localStorage.getItem('token');
    const todoToUpdate = todos.find(todo => todo.id === id);
    const updatedStatus = todoToUpdate.status === 'done' ? 'pending' : 'done'; // Toggle status
    try {
      await updateTodo(token, id, { status: updatedStatus });
      fetchTodos(token); // Refresh todo list
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <TodoForm onSubmit={handleAddTodo} />
      <TodoList todos={todos} onDelete={handleDeleteTodo} onUpdate={handleUpdateTodo} />
    </div>
  );
};

export default Profile;
