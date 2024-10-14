import { app } from "./app.js";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config();

// PORT
const PORT = process.env.PORT;


db.getConnection()
    .then((connection) => {
        console.log("Database connected successfully!");
        app.listen(PORT, () => {
            console.log("server is running");
        });

        connection.release(); // Release the connection back to the pool
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });
