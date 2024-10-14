import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateToken = (email, expiry) => {
    const token = jwt.sign({ email }, process.env.JWT_SECERET, {
        expiresIn: expiry,
    });
    return token;
};

export const verifyToken = (token) => {
    try {
        // Verify the token with the secret and return the decoded payload if valid
        const decoded = jwt.verify(token, process.env.JWT_SECERET);
        return {
            valid: true,
            decoded: decoded, // Return decoded token data
        };
    } catch (error) {
        // If token verification fails (expired or invalid), return a valid: false flag
        if (error.name === "TokenExpiredError") {
            return { valid: false, message: "Token has expired" };
        } else if (error.name === "JsonWebTokenError") {
            return { valid: false, message: "Invalid token" };
        } else {
            return { valid: false, message: "Token verification failed" };
        }
    }
};

export const generateHashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
};

export const isPasswordCorrect = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};
