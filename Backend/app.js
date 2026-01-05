import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connectionDB } from "./src/database/connection.db.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import userRouter from "./src/router/user.router.js";
import adminRouter from "./src/router/admin.route.js"
import auctionRouter from "./src/router/auction.route.js";
import bidRouter from "./src/router/bid.route.js";
import commissionRouter from "./src/router/commision.route.js";
import { verifyCommissionCron } from "./src/automation/verifyCommission.js";
import { endedAuctionCron } from "./src/automation/endAuction.js";
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

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/auctions", auctionRouter);
app.use("/api/v1/bids", bidRouter);
app.use("/api/v1/commission", commissionRouter);

verifyCommissionCron();
endedAuctionCron();
connectionDB();
app.use(errorMiddleware);

export default app;
