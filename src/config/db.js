import mysql from "mysql2/promise"; // Change this to mysql2
import { configDotenv } from "dotenv";

configDotenv();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10, // Max number of connections
    queueLimit: 0, //
});

export default pool;
