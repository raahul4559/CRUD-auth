import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    // get the token from cookie or header
    // if there is no token then unauthorized
    // if there is token then verify the token is valid or not
    // if token is valid then find the user with the id in token
    // if there is no user then unauthorized
    // if there is user then attach the user to req object and call next()
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")

        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }
        req.user = user;
        next();


    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid accesstoken")
    }
})