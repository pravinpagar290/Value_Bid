import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connectionDB } from "./src/database/connection.db.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import userRouter from "./src/router/user.router.js";

const app = express();
config();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/users", userRouter);

connectionDB();
app.use(errorMiddleware);

export default app;
