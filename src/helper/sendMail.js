import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateToken } from "./helper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, "../../public/reset-email.html");
let htmlTemplate = fs.readFileSync(templatePath, "utf-8");

export const sendResetPasswordLink = async (userEmail) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: false, // true for port 465, false for other ports
        auth: {
            user: "muhammaduzairilyas@gmail.com",
            pass: "lcsf kleb eipw fezi",
        },
    });

    const token = generateToken(userEmail, "1hr");
    const resetLink = `https://localhost:5173/reset-password/token=${token}`;
    htmlTemplate = htmlTemplate.replace(/{{reset_link}}/g, resetLink);

    try {
        const info = await transporter.sendMail({
            from: "muhammaduzairilyas@gmail.com",
            to: userEmail,
            subject: "Reset Password Link",
            text: "Hello world?",
            html: htmlTemplate,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
};


