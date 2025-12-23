import express from "express";
import { placeBid } from "../controllers/bid.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkAuctionTime } from "../middlewares/auctionTimeCheck.middleware.js";
import { isAuthorized } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/place_bid/:id",
  isAuthenticated,
  isAuthorized("bidder"),
  checkAuctionTime,
  placeBid
);
export default router;
