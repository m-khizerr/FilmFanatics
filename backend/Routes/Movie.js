const express = require('express');
const router = express.Router();
const movieController = require('../Controllers/Movie');

// Route to add a new movie
router.post('/addmovie', movieController.addMovie);
router.get('/getallmovies', movieController.getAllMovies)
router.get('/getmovie/:id', movieController.getMovie)
router.get('/topmovies', movieController.getTopMovies)

module.exports = router;
