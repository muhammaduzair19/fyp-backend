import jwt from "jsonwebtoken";
import db from "../config/db.js";
import { configDotenv } from "dotenv";
import {
    generateAccessToken,
    generateHashedPassword,
    isPasswordCorrect,
} from "../helper/helper.js";
import { asyncHandler } from "../helper/asyncHandler.js";
import { ApiError } from "../helper/apiError.js";
import { ApiResponse } from "../helper/apiResponse.js";

configDotenv();

export const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if (
        [fullname, email, password].some(
            (field) => !field || field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const [result] = await db.query(`select * from users where email = ? `, [
        email,
    ]);

    if (result.length > 0) {
        throw new ApiError(400, "User already exists with this email");
    }

    const hashedPassword = await generateHashedPassword(password);

    const username = fullname?.split(" ").join("").toLowerCase();

    const [results] = await db.query(
        "insert into users (fullname, email,username, password) values (?,?,?,?)",
        [fullname, email, username, hashedPassword]
    );

    const token = generateAccessToken(results.insertId, email);

    const data = {
        userId: results.insertId,
        email: email,
        token,
    };

    return res.status(201).json(new ApiResponse(200, data, "User created"));
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "Credentials required");
    }

    const [result] = await db.query(`select * from users where email = ? `, [
        email,
    ]);

    if (!result[0]) {
        throw new ApiError(400, "User doesn't exist with this email");
    }

    const { id, password: hashedPassword } = result[0];
    const isCorrect = isPasswordCorrect(password, hashedPassword);

    if (!isCorrect) {
        throw new ApiError(400, "Invalid Credentials");
    }

    const token = generateAccessToken(id, email);

    const data = {
        userId: id,
        email: email,
        token,
    };

    return res
        .status(200)
        .json(new ApiResponse(200, data, "Login Successfully"));
});

export const verifyEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if ([email].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "Credentials required");
    }

    const [result] = await db.query(`select * from users where email = ? `, [
        email,
    ]);

    if (!result[0]) {
        throw new ApiError(400, "User doesn't exist with this email");
    }


    

});
