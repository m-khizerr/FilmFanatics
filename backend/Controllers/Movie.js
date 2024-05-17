const Movie = require('../Models/Movie');

exports.addMovie = async (req, res) => {
    try {
        const { title, genre, description, poster, trailer } = req.body;

        console.log("Adding Movie", title);
        const newMovie = new Movie({
            title,
            genre,
            description,
            poster,
            trailer,
        });

        await newMovie.save();

        res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(201).json({ message: 'Movies retrieved successfully', movies: movies });
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const movie = await Movie.findById(id);
        res.status(201).json({ message: 'Movies retrieved successfully', movie: movie });
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getTopMovies = async (req, res) => {
    try {
        // Fetch all movies with their reviews populated
        const movies = await Movie.find().populate('reviews').exec();

        console.log("Populated reviews movies: ", movies);
    
        // Calculate average rating for each movie
        const moviesWithRatings = movies.map(movie => {
          const ratings = movie.reviews.map(review => review.rating);
          const averageRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : 0;
          return { ...movie.toObject(), averageRating };
        });

        console.log('average rating: ', moviesWithRatings);
    
        // Sort movies by average rating in descending order
        moviesWithRatings.sort((a, b) => b.averageRating - a.averageRating);
    
        // Get top 20 movies
        const topMovies = moviesWithRatings.slice(0, 20);
    
        res.json({ message: 'Top 20 movies retrieved successfully', movies: topMovies });
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving movies', error });
      }
}


