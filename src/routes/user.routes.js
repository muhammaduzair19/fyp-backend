import express from "express";
import {
    loginUser,
    registerUser,
    resetPassword,
    verifyEmail,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify", verifyEmail);
router.post("/reset-password", resetPassword);

export default router;
