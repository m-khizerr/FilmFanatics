// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

dotenv.config(); // Load environment variables from .env file

// Define the port to listen on
const port = process.env.PORT || 3001;

// Start the server
app.listen(port, () => {
    console.log(`App Listening at Port ${port}`);
});

// Connect to the database
const DB = process.env.DB;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.log(error.message);
});
