// Level 4: Date & Time (Often done wrong)

import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"


// 16. Group users by registration year and count them.
export const getUsersbyYear = asyncHandler(async (req, res, next) => {
    const usersRegistered = await User.aggregate([
        {
            $group: {
                _id: { $year: "$registered" },
                countUser: { $sum: 1 }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, usersRegistered, "Fetched the users by registration date"))
})


// 17. Find how many users registered per year per country.
export const getUsersPerCountry = asyncHandler(async (req, res, next) => {
    const usersPerCountry = await User.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$registered" },
                    country: "$company.location.country"
                },
                userCount: { $sum: 1 }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, usersPerCountry, "Fetched the users by registed date and country"))
})


// 18. Get users who registered in the first quarter (Jan–Mar) of any year.
export const usersRegisteredInQuarter = asyncHandler(async (req, res, next) => {
    const getQuarterUser = await User.aggregate([
        // {
        //     $addFields: {
        //         monthNumber: { $month: "$registered" }
        //     }
        // },
        // {
        //     $match: {
        //         monthNumber: {
        //             $gte: 1,
        //             $lt: 4
        //         }
        //     }
        // }
        // More improved pipeline within oneliner
        {
            $match: {
                $expr: {
                    $lte: [{ $month: "$registered" }, 3]
                }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, getQuarterUser, "Fetched the user that registered in first Quarter"))
})


// 19. Find the earliest and latest registered user per country.
export const getUserByDate = asyncHandler(async (req, res, next) => {
    const usersByDate = await User.aggregate([
        {
            $group: {
                _id: "$company.location.country",
                latestRegistered: { $max: "$registered" },
                earliestRegistered: { $min: "$registered" },
                firstUser: { $first: "$name" },
                lastUser: { $last: "$name" }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, usersByDate, "Fetched user by latest and earliest date"))
})