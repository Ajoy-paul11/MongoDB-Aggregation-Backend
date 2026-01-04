// Level 2: Grouping & Metrics (Real dashboards)

import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


// 6. Count how many users are active vs inactive.
export const usersStatusType = asyncHandler(async (req, res, next) => {
    const usersStatus = await User.aggregate([
        {
            $group: {
                _id: "$isActive",
                countUserStatus: { $sum: 1 }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, usersStatus, "User status count retrieved successfully"))
})


// 7. Find the average age per gender.
export const avgAgePerGender = asyncHandler(async (req, res, next) => {
    const usersAvgAge = await User.aggregate([
        {
            $group: {
                _id: "$gender",
                avgAge: { $avg: "$age" }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, usersAvgAge, "Average age per gender fetched successfully"))
})


// 8. Find the number of users per country (from company.location.country), sorted by highest count.
export const usersPerCountry = asyncHandler(async (req, res, next) => {
    const perCountryUsers = await User.aggregate([
        {
            $group: {
                _id: "$company.location.country",
                usersCount: { $sum: 1 }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, perCountryUsers, "Fetched the users per country"))
})


// 9. Find the top 3 countries with most active users.
export const getTopUsers = asyncHandler(async (req, res, next) => {
    const topUsers = await User.aggregate([
        {
            $group: {
                _id: "$company.location.country",
                activeUsers: { $sum: 1 }
            }
        },
        {
            $sort: { activeUsers: -1 }
        },
        {
            $limit: 3
        }
    ])

    return res.status(200).json(new ApiResponse(200, topUsers, "Fetched the top 3 country with active users"))
})


// 10. Get min, max, and average age of users per country.
export const usersInfo = asyncHandler(async (req, res, next) => {
    const userData = await User.aggregate([
        {
            $group: {
                _id: "$company.location.country",
                agvAge: { $avg: "$age" },
                minAge: { $min: "$age" },
                maxAge: { $max: "$age" }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, userData, "Fetched the each country age details"))
})