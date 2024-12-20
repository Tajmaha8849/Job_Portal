import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
config({ path: "./config/config.env" });

const allowedOrigins = ["https://job-portal-client-nine.vercel.app"];
app.use(
  cors({
    origin: allowedOrigins, // Allow only this frontend URL
    credentials: true, // Allow sending cookies
    methods: "GET, POST, PUT, DELETE, OPTIONS", // Allowed methods
    allowedHeaders: "Content-Type, Authorization", // Allowed headers
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Database connection
dbConnection();

// Error middleware
app.use(errorMiddleware);

export default app;
