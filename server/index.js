import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbconnection.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({quiet: true, path: ".env"});

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
