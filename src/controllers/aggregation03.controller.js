// Level 3: Array Operations (Real Mongo pain point)

import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"


// 11. Count how many times each tag appears across all users.
export const countEachTag = asyncHandler(async (req, res, next) => {
    const tagPerUsers = await User.aggregate([
        {
            $unwind: { path: "$tags" }
        },
        {
            $group: {
                _id: "$tags",
                countEachTag: { $sum: 1 }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, tagPerUsers, "Fetched tags per User"))
})


// 12. Find the top 5 most common tags.
export const getCommonTag = asyncHandler(async (req, res, next) => {
    const mostCommonTag = await User.aggregate([
        {
            $unwind: "$tags"
        },
        {
            $group: {
                _id: "$tags",
                countTag: { $sum: 1 }
            }
        },
        { $sort: { countTag: -1 } },
        { $limit: 5 }
    ])

    return res.status(200).json(new ApiResponse(200, mostCommonTag, "Fetched most 5 common tags"))
})