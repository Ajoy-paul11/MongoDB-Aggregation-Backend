// Level 5: Derived Fields & Business Logic

import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"


// 20. Add a computed field isYoung:
// true if age < 30
// false otherwise
export const addisYoung = asyncHandler(async (req, res, next) => {
    const addisYoungField = await User.aggregate([
        {
            $addFields: {
                isYoung: {
                    $lt: ["$age", 30]
                }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, addisYoungField, "Fetched users with isYoung field"))
});


// 21. Categorize users into:

// "young" (<25)
// "mid" (25–35)
// "senior" (>35)
//  Then count users per category.
export const userAgeCategory = asyncHandler(async (req, res, next) => {
    const userCategoryByAge = await User.aggregate([
        {
            $addFields: {
                ageCategory: {
                    $switch: {
                        branches: [
                            { case: { $lt: ["$age", 25] }, then: "young" },
                            {
                                case: {
                                    $and: [
                                        { $gte: ["$age", 25] },
                                        { $lt: ["$age", 35] }
                                    ]
                                }, then: "mid"
                            }
                        ],
                        default: "senior"
                    }
                }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, userCategoryByAge, "Fetched users per age category"))
});


// 22. Add a field companyRegion:

// "EU" → France, Germany, Italy
// "US" → USA
// "OTHER" → rest
export const addCompanyRegion = asyncHandler(async (req, res, next) => {
    const companyRegion = await User.aggregate([
        {
            $addFields: {
                companyRegion: {
                    $switch: {
                        branches: [
                            { case: { $in: ["$company.location.country", ["France", "Germany", "Italy"]] }, then: "EU" },
                            { case: { $eq: ["$company.location.country", "USA"] }, then: "US" }
                        ],
                        default: "OTHER"
                    }
                }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, companyRegion, "Fetched users per company region"))
});


// 23. Return users where company email domain matches company title
//  (e.g., @yurture.com for YURTURE).
export const companyEmailDomain = asyncHandler(async (req, res, next) => {
    const domainOfComapany = await User.aggregate([
        {
            $addFields: {
                companyDomain: {
                    $toLower: {
                        $arrayElemAt: [
                            { $split: ["$company.email", "@"] }, 1
                        ]
                    }
                },
                companyTitle: {
                    $toLower: {
                        $concat: ["$company.title", ".com"]
                    }
                }
            }
        },
        {
            $match: {
                $expr: {
                    $eq: ["$companyDomain", "$companyTitle"]
                }
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, domainOfComapany, "Fetched users per company email domain"))
})