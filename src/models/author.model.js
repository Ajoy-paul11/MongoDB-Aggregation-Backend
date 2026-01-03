import mongoose, { Schema } from "mongoose";


const authorSchema = new Schema({
    _id: Number,
    name: String,
    birth_year: Number
})


export const Author = mongoose.model("Author", authorSchema);