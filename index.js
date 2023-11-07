import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Movie } from "./models/movieModel.js";
import 'dotenv/config'

const app = express();
const PORT = 3000;

// Middleware for parsing request body
app.use(express.json());
 
// Middleware for CORS POLICY
var whitelist = [process.env.FRONTEND_URL]
app.use(
    cors({
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
              callback(null, true)
            } else {
              callback(new Error('Not allowed by CORS'))
            }
          }
    })
)

app.get("/", (req, res) => {
    res.send("Hello Movie Lovers")
})

app.post("/movies", async(req, res) => {
    try{
        const newMovie = new Movie({
            Title: req.body.Title,
            Year: req.body.Year,
            Rated: req.body.Rated,
            Runtime: req.body.Runtime,
            Genre: req.body.Genre,
            Director: req.body.Director,
            Writer: req.body.Writer,
            Actors: req.body.Actors,
            Plot: req.body.Plot,
            Poster: req.body.Poster,
            imdbRating: req.body.imdbRating,
            Trailer: req.body.Trailer,
            Type: req.body.Type,
            TotalSeasons: req.body.TotalSeasons,
            WatchList: req.body.WatchList
        })
        newMovie.save();
        res.send(newMovie);
    } catch(err){
        res.send({message: err.message})
    }
})

app.patch("/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const movie = await Movie.findByIdAndUpdate(id, update);
        res.send(movie);
    } catch(err) {
        res.send({message: err.message});
    }
})

app.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.send(movies);
    } catch(err){
        res.send({message: err.message})
    }
})

app.get("/movies/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        res.send(movie);
    } catch(err){
        res.send({message: err.message});
    }
})


mongoose.connect(process.env.MONGODB_URL).then( () => {
    console.log("App connected to database");
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`)
    });
}).catch( (err) => {
    console.log(err);
})