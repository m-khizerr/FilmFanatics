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


