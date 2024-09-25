// app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the routes for authentication and todo management
app.use('/api', authRoutes);
app.use('/api', todoRoutes);

// Set the server to run on port 5000 or an environment-defined port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

