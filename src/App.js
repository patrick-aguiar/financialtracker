import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import {readFile} from "fs/promises"
import path from 'path';
import { fileURLToPath } from 'url';
import transactionsRoute from "../routes/transactions.js";
import connectDB from "../config/db.js";

dotenv.config({ path: "./config/config.env" });

connectDB();
const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName);

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use("/api/v1/transactions", transactionsRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
}

export default app;
