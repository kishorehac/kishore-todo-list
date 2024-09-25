// models/database.js
const sqlite3 = require('sqlite3').verbose();

// Create an in-memory SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

// Initialize tables for users and todos
db.serialize(() => {
  db.run(`CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE todos (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    task_description TEXT NOT NULL,
    status TEXT CHECK(status IN ('pending', 'in progress', 'done', 'completed')) NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);
});

module.exports = db;
