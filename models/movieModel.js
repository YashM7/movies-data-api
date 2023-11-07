import mongoose from "mongoose";

const moiveSchema = mongoose.Schema(
    {
        Title: {
            type: String,
            require: true,
        },
        Year: {
            type: String
        },
        Rated: {
            type: String
        },
        Runtime: {
            type: String
        },
        Genre: {
            type: String
        },
        Director: {
            type: String
        },
        Writer: {
            type: String
        },
        Actors: {
            type: String
        },
        Plot: {
            type: String
        },
        Poster: {
            type: String
        },
        imdbRating: {
            type: String
        },
        Trailer: {
            type: String
        },
        Type: {
            type: String
        },
        TotalSeasons: {
            type: String
        },
        WatchList: {
            type: String
        }
    }
)

export const Movie = mongoose.model("Movie", moiveSchema);