// Backend/controllers/authController.js

const User = require('../models/User'); // Ensure this path is correct
// Use bcryptjs instead of bcrypt
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup function
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Other functions (login, getProfile)
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign({ _id: user._id }, 'your_secret_key'); // Use your actual secret key
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // Use the user ID from the token
        if (!user) return res.status(404).send('User not found');
        res.json({ name: user.name, email: user.email }); // Send user details
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Export the functions
module.exports = { signup, login, getProfile };



