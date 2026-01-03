// Level 1: Foundation (Filtering, Projection, Sorting)

import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


// 1. Get all active users and return only:
// name
// age
// company title
// country  (No _id in output)
export const getActiveUsers = asyncHandler(async (req, res, next) => {
    const users = await User.aggregate([
        {
            $match: { isActive: true }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                age: 1,
                companyTilte: "$company.title",
                country: "$company.location.country"
            }
        }
    ]);

    return res.status(200).json(new ApiResponse(200, users, "Fetched active users successfully"));
})


// 2. Find users who registered before 2016, sorted by registration date (oldest first).
export const registeredBeforeSixteen = asyncHandler(async (req, res, next) => {
    const registeredUsers = await User.aggregate([
        {
            $match: {
                registered: { $lt: new Date("2016-01-01T00:00:00Z") }
            }
        },
        {
            $sort: { registered: 1 }
        }
    ])

    return res.status(200).json(new ApiResponse(200, registeredUsers, "Users registered before 2016 retrieved successfully"))
})


// 3. Get all users whose age is between 25 and 35, sorted by age descending.
export const ageBucket = asyncHandler(async (req, res, next) => {

})