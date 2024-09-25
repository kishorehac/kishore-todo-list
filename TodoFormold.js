// src/components/TodoForm.js
import React, { useState } from 'react';

const TodoForm = ({ onSubmit }) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ task_description: taskDescription, status });
    setTaskDescription('');
    setStatus('pending');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;

