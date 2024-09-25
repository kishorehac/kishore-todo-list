// src/components/TodoList.js
import React from 'react';

const TodoList = ({ todos, onDelete, onUpdate }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.task_description} - {todo.status}</span>
          <button onClick={() => onUpdate(todo.id)}>Update</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
