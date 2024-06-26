const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controllers/User');
const movieController = require('../Controllers/Movie');

// Route to add a new movie
router.post('/addmovie', movieController.addMovie);
// Signup route
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
