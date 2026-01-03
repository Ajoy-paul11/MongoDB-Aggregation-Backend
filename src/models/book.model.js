import mongoose, { Schema } from "mongoose";


const bookSchema = new Schema({
    _id: Number,
    title: String,
    author_id: Number,
    genre: String
})


export const Book = mongoose.model("Book", bookSchema)