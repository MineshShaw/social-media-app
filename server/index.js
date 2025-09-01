import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbconnection.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config({quiet: true, path: ".env"});

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
