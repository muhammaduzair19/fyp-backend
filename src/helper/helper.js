import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateAccessToken = (userId, email) => {
    return jwt.sign({ userId, email }, process.env.JWT_SECERET, {
        expiresIn: "2d",
    });
};

export const generateHashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
};

export const isPasswordCorrect = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};
