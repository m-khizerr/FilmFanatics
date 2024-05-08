const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/Review');

// Route to add a new movie
router.post('/addreview', reviewController.addReview);
router.get('/getallreviews', reviewController.getAllReviews)
router.get('/getreviews/:id', reviewController.getReviews)

module.exports = router;
