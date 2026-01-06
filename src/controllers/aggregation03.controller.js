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


// 13. Find users who have the tag "consequat" more than once in their tags array.
export const getUsersMoreTag = asyncHandler(async (req, res, next) => {
    const usersWithTwoTags = await User.aggregate([
        {
            $unwind: "$tags"
        },
        // Filter tags to only "consequat"
        {
            $match: { tags: "consequat" }
        },
        // Now, group by user's _id because we introduced a tagCount field
        // that counts how many time the tag appears for each user.
        // If one user had more than one the count will be > 1
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                tagCount: { $sum: 1 }
            }
        },
        // Filter to only those users who have tagCount > 1
        {
            $match: { tagCount: { $gt: 1 } }
        }
    ])

    return res.status(200).json(new ApiResponse(200, usersWithTwoTags, "Fetched users with tag `consequat`"));
})


// 14. For each user, add a new field tagCount.
export const addTagCount = asyncHandler(async (req, res, next) => {
    const usersWithTagCount = await User.aggregate([
        {
            $addFields: {
                tagCount: { $size: "$tags" }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, usersWithTagCount, "Fetched users after adding tagCount field"))
})