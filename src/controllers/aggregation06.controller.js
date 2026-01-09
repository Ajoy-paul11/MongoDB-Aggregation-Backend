// Level 6: Join-like Thinking (Authors & Books)

import { Book } from "../models/book.model.js";
import { Author } from "../models/author.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"


// 24. Join authors with their books, returning:

// author name
// book titles (array)
export const joinAuthorsWithBooks = asyncHandler(async (req, res, next) => {
    const getAuthorsWithBooks = await Book.aggregate([
        {
            $lookup: {
                from: "authors",
                localField: "author_id",
                foreignField: "_id",
                as: "authorDetails"
            }
        },
        {
            $project: {
                _id: 0,
                authorName: "$authorDetails.name",
                bookTitle: "$title"
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, getAuthorsWithBooks, "Fetched authors with their books"))
})


// 25. Find authors who have written exactly one book
export const authorsWithOneBook = asyncHandler(async (req, res, next) => {
    const oneBookAuthors = await Author.aggregate([
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "author_id",
                as: "bookDetails"
            }
        },
        {
            $match: { "bookDetails": { $size: 1 } }
        },
        {
            $project: {
                _id: 0,
                name: 1
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, oneBookAuthors, "Fetched authors with one book"))
})


// 26. Find authors who wrote books in the "Classic" genre
export const classicAuthors = asyncHandler(async (req, res, next) => {
    const authorClassicGenre = await Author.aggregate([
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "author_id",
                as: "bookDetails"
            }
        },
        {
            $match: { "bookDetails.genre": "Classic" }
        }
    ])

    return res.status(200).json(new ApiResponse(200, authorClassicGenre, "Fetched authors with classic books"))
})


// 27. Count how many books each author has written.
export const countBookPerAuthor = asyncHandler(async (req, res, next) => {
    const bookPerAuthor = await Author.aggregate([
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "author_id",
                as: "bookDetails"
            }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                bookCount: { $size: "$bookDetails" }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, bookPerAuthor, "Fetched book count per author"))
})


// 28. Return books along with:

// author name
// author birth year
export const joinBooksWithAuthors = asyncHandler(async (req, res, next) => {
    const booksWithAuthor = await Book.aggregate([
        {
            $lookup: {
                from: "authors",
                localField: "author_id",
                foreignField: "_id",
                as: "authorDetails"
            }
        },
        {
            $project: {
                _id: 0,
                authorName: "$authorDetails.name",
                authorBirthYear: "$authorDetails.birth_year",
                bookTitle: "$title"
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, booksWithAuthor, "Fetched books with their authors"))
})