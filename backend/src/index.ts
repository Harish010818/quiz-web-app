import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));


const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
   console.log(`Server is running on port ${PORT}`)
});