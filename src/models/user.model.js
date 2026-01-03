import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    index: Number,
    name: String,
    isActive: Boolean,
    registered: Date,
    age: Number,
    gender: String,
    eyeColor: String,
    favoriteFruit: String,
    company: {
        title: String,
        email: String,
        phone: String,
        location: {
            country: String,
            address: String
        }
    },
    tags: [String]
})


export const User = mongoose.model("User", userSchema);