import express from "express";
import { isAuthenticated,isAuthorized } from "../middlewares/auth.middleware.js";
import { trackCommissionStatus } from "../middlewares/trackCommission.middleware.js";
import {
  addNewAuctionItem,
  getAllItems,
  getAuctionDetails,
  getMyAuctionItems,
  removeFromAuction,
  republishItem,
} from "../controllers/auctionItem.controller.js";


const router = express.Router();

router.post(
  "/create_item",
  isAuthenticated,
  isAuthorized("seller"),
  trackCommissionStatus,
  addNewAuctionItem
);

router.get(
  "/items",
   getAllItems
  );

router.get(
  "/item/:id", 
  getMyAuctionItems
);

router.delete(
  "/delete_item/:id",
  isAuthenticated,
  isAuthorized("seller"),
  removeFromAuction
);
router.put(
  "/update_item/:id",
  isAuthenticated,
  isAuthorized("seller"),
  republishItem
);
router.get(
  "/get-detail/:id",
  isAuthenticated,
  isAuthorized("seller"),
  getAuctionDetails
);

export default router;
