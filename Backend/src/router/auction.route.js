import express from "express";
import {
  createAuction,
  getAllAuctionItems,
  getAuctionItem,
  updateAuctionItem,
  deleteAuctionItem,
} from "../controllers/auction.controller.js";

import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/auth.middleware.js";
import { trackCommissionStatus } from "../middlewares/trackCommission.middleware.js";

const router = express.Router();

router.post(
  "/create_item",
  isAuthenticated,
  isAuthorized("seller"),
  trackCommissionStatus,
  createAuction
);

router.get("/items", getAllAuctionItems);

router.get("/item/:id", getAuctionItem);

router.delete(
  "/delete_item/:id",
  isAuthenticated,
  isAuthorized("seller"),
  deleteAuctionItem
);
router.put(
  "/update_item/:id",
  isAuthenticated,
  isAuthorized("seller"),
  updateAuctionItem
);

export default router;
