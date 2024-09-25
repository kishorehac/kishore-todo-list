// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust if your server is running on a different port

// User authentication
export const signup = (userData) => axios.post(`${API_URL}/signup`, userData);
export const login = (userData) => axios.post(`${API_URL}/login`, userData);

// User profile
export const getProfile = (token) => axios.get(`${API_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } });

// Todos
export const getTodos = (token) => axios.get(`${API_URL}/todos`, { headers: { Authorization: `Bearer ${token}` } });
export const createTodo = (token, todoData) => axios.post(`${API_URL}/todos`, todoData, { headers: { Authorization: `Bearer ${token}` } });
export const updateTodo = (token, id, todoData) => axios.put(`${API_URL}/todos/${id}`, todoData, { headers: { Authorization: `Bearer ${token}` } });
export const deleteTodo = (token, id) => axios.delete(`${API_URL}/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
