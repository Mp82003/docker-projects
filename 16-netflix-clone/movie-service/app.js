const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3001;

// JSON request body ko read karne ke liye
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://netflix-mongodb:27017/netflix")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
});

// Movie Model
const Movie = mongoose.model("Movie", movieSchema);

// Home route
app.get("/", (req, res) => {
    res.send("Movie Service is running");
});

// GET all movies
app.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch movies"
        });
    }
});

// POST new movie
app.post("/movies", async (req, res) => {
    try {
        const movie = await Movie.create(req.body);

        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create movie",
            error: error.message
        });
    }
});

// GET movie by ID
app.get("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json(movie);
    } catch (error) {
        res.status(400).json({
            message: "Invalid movie ID"
        });
    }
});


// UPDATE movie
app.put("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json(movie);
    } catch (error) {
        res.status(400).json({
            message: "Failed to update movie",
            error: error.message
        });
    }
});


// DELETE movie by ID
app.delete("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json({
            message: "Movie deleted successfully",
            movie: movie
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid movie ID"
        });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Movie Service running on port ${PORT}`);
});
