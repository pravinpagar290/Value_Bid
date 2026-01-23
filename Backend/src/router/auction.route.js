import express from "express";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/auth.middleware.js";
import { trackCommissionStatus } from "../middlewares/trackCommission.middleware.js";
import {
  addNewAuctionItem,
  getAllItems,
  getAuctionDetails,
  getMyAuctionItems,
  removeFromAuction,
  republishItem,
  getAuctionsWon,
  getPaymentProofForAuction,
} from "../controllers/auctionItem.controller.js";
import { proofOfPayment } from "../controllers/commission.controller.js";

const router = express.Router();

router.post(
  "/create-item",
  isAuthenticated,
  isAuthorized("seller"),
  trackCommissionStatus,
  addNewAuctionItem,
);

router.get("/items", getAllItems);

router.get(
  "/item/:id",
  isAuthenticated,
  isAuthorized("seller"),
  getMyAuctionItems,
);

router.delete(
  "/delete-item/:id",
  isAuthenticated,
  isAuthorized("seller"),
  removeFromAuction,
);
router.put(
  "/republish-item/:id",
  isAuthenticated,
  isAuthorized("seller"),
  republishItem,
);
// Route for getting auctions won by the user
router.get("/won", isAuthenticated, getAuctionsWon);
router.get("/get-detail/:id", isAuthenticated, getAuctionDetails);
router.post(
  "/proof/pay",
  isAuthenticated,
  isAuthorized("bidder"),
  proofOfPayment,
);

router.get(
  "/get-payment-proof/:id",
  isAuthenticated,
  isAuthorized("seller"),
  getPaymentProofForAuction,
);

export default router;
