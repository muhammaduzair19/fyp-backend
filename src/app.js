import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

const app = express();
dotenv.config();

/* MIDDLEWARES */

//json parser
app.use(express.json({ limit: "20kb" }));

// log for api calling
app.use(morgan("dev"));

//cors
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

//url parser
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

//for static files
app.use(express.static("public"));




// ROUTES
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes);




export { app };
