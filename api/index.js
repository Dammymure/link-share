import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoute.js";




dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes)
app.use("/profile", userRoutes)



/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
 .connect(process.env.MONGO_URL)
 .then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

 })
 .catch((error) => console.log(`${error} did not connect`));