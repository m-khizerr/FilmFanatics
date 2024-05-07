const User = require('../Models/User');
const jwt = require('jsonwebtoken');

// Signup controller
exports.signup = async (req, res) => {
    try {
        // Extract user data from request body
        const { name, email, password } = req.body;

        // Check if user with given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password // Note: You should hash the password before saving it to the database
        });

        // Save the user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error occurred during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login controller
exports.login = async (req, res) => {
    try {
        console.log("logiing in");
        // Extract email and password from request body
        const { email, password } = req.body;

        // Find the user with the provided email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error occurred during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
