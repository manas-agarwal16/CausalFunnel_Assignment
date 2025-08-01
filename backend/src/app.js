import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// const allowedOrigins = process.env.CORS_ORIGIN.split(",");
const allowedOrigins = [process.env.CORS_ORIGIN];

//.use to configure middelware.
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

//route imports
import userRoutes from "./routes/userRoutes.js";

//using routes
app.use("", userRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Welcome CausalFunnel Team. This is the backend server for the Quiz Application."
    );
});

export { app };
