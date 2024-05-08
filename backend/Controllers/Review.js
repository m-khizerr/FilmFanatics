const Review = require('../Models/Review');
const Movie = require('../Models/Movie');
const User = require('../Models/User')

exports.addReview = async (req, res) => {
    try {
        const { rating, content, userEmail, movieId } = req.body;

        const user = await User.findOne({email: userEmail});
        const movie = await Movie.findById(movieId)

        if(!movie) {
            console.log('movie not found');
            return res.status(500).json({ error: 'Not found' });
        }
        if(!user) {
            console.log('User not found');
            return res.status(500).json({ error: 'Not found' });
        }

        console.log(rating, content, userEmail, movieId);

        console.log("Adding review", req.body);
        const newReview = new Review({
            rating: rating,
            content: content,
            reviewer: user
        });

        const savedReview = await newReview.save();
        movie.reviews.push(savedReview);
        await movie.save();

        res.status(201).json({ message: 'Review added successfully', review: savedReview });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(201).json({ message: 'Reviews retrieved successfully', reviews: reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id).populate('reviews');

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Fetch complete data for each review
        const reviewsData = await Promise.all(movie.reviews.map(async reviewId => {
            const review = await Review.findById(reviewId);
            const user = await User.findById(review.reviewer);
            const reviewData = {
                review,
                user
            }
            console.log(reviewData);
            return reviewData;
        }));

        res.status(200).json({ message: 'Reviews retrieved successfully', reviews: reviewsData });
    } catch (error) {
        console.error('Error fetching Reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


